/* eslint-disable react-native/no-inline-styles */

import { PressableProps, StyleProp,  View, ViewStyle } from "react-native";
import { ReactNode } from "react";
import ShowWhen from "../Other/ShowWhen";
import SlidingBottomModal, { SlidingBottomModalProps } from "./SlidingBottomModal";
import IconButton from "../Buttons/IconButton";
import RoundedButton from "../Buttons/RoundedButton";
import { TextTheme, ThemeView } from "../../Contexts/ThemeProvider";

type ActionButton = {
    key?: string,
    title: string,
    onPress: (arg: PressableProps) => void,
    color?: string,
    backgroundColor?: string,
    icon?: any,
    style?: ViewStyle
};

export { type ActionButton as BottomModalActionButton }

type BottomModalProps = SlidingBottomModalProps & {
    actionButtons?: ActionButton[],
    actionContainerContent?: ReactNode,
    style?: StyleProp<ViewStyle>
}

export default function BottomModal({ setVisible, children, actionButtons, actionContainerContent, style, ...props }: BottomModalProps): React.JSX.Element {

    return (
        <SlidingBottomModal {...props}  
            setVisible={setVisible}
            footer={
                <ThemeView style={{height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: 12, alignSelf: 'flex-end'}}  >
                    <ThemeView 
                        useInvertTheme={true} 
                        style={{position: 'absolute', width: '100%', height: 2}} 
                    />
                    
                    <View style={{paddingLeft: 12}} >
                        <IconButton
                            iconName="x"
                            onPress={() => setVisible(false)}
                        />
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 12, paddingRight: 12}} >
                        <ShowWhen when={!actionContainerContent} otherwise={actionContainerContent} >
                            {
                                actionButtons?.map((button, index) => (
                                    <RoundedButton
                                        key={button.key || index}
                                        style={button.style}
                                        onPress={button.onPress}
                                        backgroundColor={button.backgroundColor}
                                    >
                                        {button.icon}
                                        <TextTheme color={button.color} style={{marginLeft: 4}}>{button.title}</TextTheme>
                                    </RoundedButton>
                                ))
                            }
                        </ShowWhen>
                    </View>
                </ThemeView>
            }
        >
            <View style={[style, {maxHeight: '100%'}]} > 
                {children}
            </View> 
        </SlidingBottomModal>
    );
}