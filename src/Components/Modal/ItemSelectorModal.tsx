import { FlatList, TextInput, View, ViewStyle } from "react-native";
import { TextTheme, useTheme } from "../../Contexts/ThemeProvider";
import { Dispatch, ReactNode, SetStateAction, useRef, useState } from "react";
import BottomModal, { BottomModalActionButton } from "./BottomModal";
import ShowWhen from "../Other/ShowWhen";
import FeatherIcon from "../Icon/FeatherIcon";
import AnimateButton from "../Buttons/AnimateButton";

type Props<item> = {
    title: string
    allItems: item[],
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    onSelect: (item: item) => void,
    SelectedItemContent: ReactNode,
    renderItemContent: (item: item) => ReactNode
    keyExtractor: (item: item) => string,
    filter: (item: item, val: string) => boolean,
    actionButtons?: BottomModalActionButton[]
    selected?: item | null,
    closeOnSelect?: boolean
    renderItemStyle?: ViewStyle,
}

export function ItemSelectorModal<item>({visible, setVisible, onSelect, allItems, title, keyExtractor, filter, SelectedItemContent, renderItemContent, actionButtons, selected=null, renderItemStyle, closeOnSelect=true}: Props<item>) : React.JSX.Element {

    const {primaryColor, secondaryBackgroundColor} = useTheme();

    const timeoutId = useRef<NodeJS.Timeout>(undefined);
    const [data, setData] = useState<item[]>(allItems);
    const [isInputFocus, setInputFocus] = useState<boolean>(false)

    function handleDataFilter(inputValue: string): void {
        inputValue = inputValue.trim().toLowerCase();
        clearTimeout(timeoutId.current);
        if(!inputValue){ 
            setData(allItems);
            return;
        }

        timeoutId.current = setTimeout(() => {
            setData(allItems.filter(item => filter(item, inputValue.toLowerCase())));
        }, 250);
    }

    return (
        <BottomModal
            visible={visible} setVisible={setVisible}
            style={{paddingInline: 20, gap: 20}}
            actionButtons={actionButtons}
        >
            <TextTheme style={{fontSize: 20, fontWeight: 900}} >
                {title}
            </TextTheme>

            <ShowWhen when={selected !== null && !isInputFocus} >
                <View style={{width: "100%", padding: 16, borderRadius: 16, backgroundColor: 'rgba(150, 50, 250, 1)', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}} >
                    {SelectedItemContent}

                    <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}} >
                        <FeatherIcon name="check" size={20} color="white" />
                        <TextTheme color="white" style={{fontWeight: 900}} >Selected</TextTheme>
                    </View>
                </View>
            </ShowWhen>

            <View
                style={{ borderWidth: 2, borderColor: primaryColor, borderRadius: 100, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 10, paddingRight: 16, gap: 8 }}
            >
                <FeatherIcon name="search" size={20} />

                <TextInput
                    placeholder="Search"
                    placeholderTextColor={'gray'}
                    style={{flex: 1, color: primaryColor}}
                    onChangeText={handleDataFilter}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                />
            </View>

            <FlatList
                contentContainerStyle={{gap: 10}}
                data={data}
                
                keyExtractor={(item, index) => (
                    keyExtractor(item) + index.toString()
                )}

                renderItem={({item}) => (
                    <AnimateButton
                        style={{justifyContent: 'space-between', padding: 12, borderRadius: 12, backgroundColor: secondaryBackgroundColor, flexDirection: 'row', width: '100%', ...renderItemStyle}} 
                        onPress={() => {
                            if(closeOnSelect) 
                                setVisible(false)
                            
                            setData(allItems)
                            if(onSelect) onSelect(item)
                        }}
                    >
                        {renderItemContent(item)}
                    </AnimateButton>
                )}
            />

        </BottomModal>
    )
}