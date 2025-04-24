
import { Modal,  PressableProps, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import FeatherIcons from 'react-native-vector-icons/Feather'
import RoundedView from "../RoundedView";
import { Text } from "react-native-gesture-handler";

type BottomModalProps = {
    visible: boolean,
    setVisible: (vis: boolean) => void,
    children: React.ReactNode,
    actionButtons?: [{title: string, onPress: (arg: PressableProps) => void, color?: string, backgroundColor?: string, icon?: any}],
    transparent?: boolean,
    style?: ViewStyle,
    bottomOpationStyle?: ViewStyle,
    backdropColor?: string,
    closeOnBack?: boolean,
    animationType?: "none" | "slide" | "fade",
    onClose?: () => void
}

export default function BottomModal({visible, setVisible, children, style, backdropColor='rgba(0, 0, 0, 0.50)', actionButtons, closeOnBack=true, animationType='slide', bottomOpationStyle={}, onClose=()=>{}}: BottomModalProps): React.JSX.Element {


    return (
        <Modal backdropColor={backdropColor} animationType={animationType} visible={visible} onRequestClose={() => {setVisible(!closeOnBack); onClose();}}>
            <View style={[styles.root]}>
                <TouchableWithoutFeedback onPress={() => setVisible(false)} >
                    <View style={{width: '100%', flex: 1}}></View>
                </TouchableWithoutFeedback>

                <View style={[styles.modalContener, style]}>{children}</View>

                <View style={[styles.bottomOpations, bottomOpationStyle]}>
                    <TouchableHighlight style={styles.closeBtn} onPress={() => {setVisible(false); onClose();}}>
                        <FeatherIcons name="plus" size={16} color={'white'} style={{transform: 'rotate(45deg)'}} />
                    </TouchableHighlight>
                    
                    <View style={styles.actionsButtonsBox}>
                        {
                            actionButtons?.map(({title, onPress, color='white', backgroundColor='black', icon}) => (
                                <TouchableOpacity key={title} onPress={onPress}>
                                    <View 
                                        style={{height: 44, borderRadius: 100, paddingInline: 20, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10, backgroundColor}}
                                    >
                                        {icon ? icon : null}
                                        <Text style={{color, fontWeight: '900', fontSize: 14}}>{title}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            </View> 
        </Modal>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        width: '100%',   
        height: '100%',
        flex: 1,
        paddingInline: 2
    },

    modalContener: {
        width: '100%',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: 'gray',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
        paddingTop: 20,
        backgroundColor: 'black'
    },

    bottomOpations: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        borderBottomWidth: 0,
        height: 24,
        width: '100%',
        paddingInline: 20,
        backgroundColor: 'black'
    },

    closeBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: 36,
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'gray',
        position: 'relative',
        top: -18
    },

    actionsButtonsBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 14,
        transform: 'translateY(-25%)',
        position: 'relative'
    }
})  