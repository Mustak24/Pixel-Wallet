
import BottomModal from "./BottomModal";
import { View } from "react-native";
import style from '../../../AppStyle';
import { TextTheme, useTheme } from "../../Contexts/ThemeProvider";
import AnimateButton from "../Buttons/AnimateButton";
import { useState } from "react";
import NoralTextInput from "../Other/NoralTextInput";
import FeatherIcon from "../Icon/FeatherIcon";
import { useAppContext } from "../../Contexts/AppContext";

type PropsType = {
    visible: boolean,
    setVisible: (vis: boolean) => void,
    selected: string,
    setSelected: (val: string) => void
}

export default function CategorySelectorModal({visible, setVisible, selected, setSelected}: PropsType): React.JSX.Element {

    const {primaryColor: color, primaryBackgroundColor: backgroundColor, secondaryBackgroundColor} = useTheme();
    const {categorys, setCategorys} = useAppContext();

    const [isCategoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');

    function createCategory(){
        if(!category) return;

        setCategorys(cat => [category, ...cat]);
        setSelected(category);
        setCategoryModalVisible(false)
        setVisible(false);
    }

    return (
        <BottomModal 
            visible={visible} 
            setVisible={setVisible} 
            style={{paddingInline: 20}} 
            actionButtons={[
                {
                    title: 'Skip', backgroundColor, onPress: ()=> setVisible(false), color, 
                    style: {borderWidth: 2, borderColor: secondaryBackgroundColor}
                }
            ]}
        >
            <TextTheme style={{fontSize: 16, fontWeight: 900, marginBottom: 20}} >Select Category</TextTheme>
            <View style={[style.flex, style.flexRow, {gap: 5, flexWrap: 'wrap'}]}>
                <AnimateButton 
                    style={{
                        borderWidth: 2, borderRadius: 100, paddingInline: 20, borderColor: secondaryBackgroundColor, paddingBlock: 12,
                        backgroundColor
                    }}
                    onPress={() => {
                        setCategoryModalVisible(true)
                    }}
                >
                    <TextTheme style={{fontWeight: 900, fontSize: 16}} >+ Add New</TextTheme>
                </AnimateButton>

                {
                   categorys.map(category => (
                    <AnimateButton 
                        key={category} 
                        style={{
                            borderWidth: 2, borderRadius: 100, paddingInline: 20, borderColor: secondaryBackgroundColor, paddingBlock: 12,
                            backgroundColor: category == selected ? secondaryBackgroundColor : backgroundColor
                        }}
                        onPress={() => {
                            setSelected(category)
                            setVisible(false);
                        }}
                    >
                        <TextTheme style={{fontWeight: 900, fontSize: 16}} >{category}</TextTheme>
                    </AnimateButton>
                   )) 
                }
            </View>

            <BottomModal 
                style={{paddingInline: 20, paddingBottom: 40}} 
                visible={isCategoryModalVisible} setVisible={setCategoryModalVisible} 
                actionButtons={[{title: '+ Add', onPress: createCategory}]}
            >
                <TextTheme style={{fontSize: 16, fontWeight: 900}} >Add New Category</TextTheme>
                
                <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderBottomWidth: 2, borderColor: color, gap: 12}} >
                    <FeatherIcon name="tag" size={28} />
    
                    <NoralTextInput
                        placeholder={`Category`}
                        style={{fontSize: 24, fontWeight: 900, flex: 1}}
                        onChangeText={setCategory}
                    />
                </View>
            </BottomModal>

        </BottomModal>
    )
}