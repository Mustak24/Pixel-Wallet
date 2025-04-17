import { useState } from "react";
import { Modal, StyleSheet, Text, View, ViewStyle } from "react-native";
import FeatherIcons from 'react-native-vector-icons/Feather'
import AnimateButton from "./AnimateButton";
import RoundedView from "./RoundedView";

type BottomModalProps = {
    visible: boolean,
    children: React.ReactNode,
    actionButtons: [{title: string, onPress: () => void, color?: string, backgroundColor?: string}],
    transparent?: boolean,
    style?: ViewStyle,
    backgroundColor?: string,
    closeOnBack?: boolean,
    animationType?: "none" | "slide" | "fade"
}

export default function BottomModal({visible, children, style, backgroundColor='rgba(0, 0, 0, 0.50)', actionButtons, closeOnBack=true, animationType='slide'}: BottomModalProps): React.JSX.Element {

    const [isVisible, setVisible] = useState<boolean>(visible)

    return (
        <Modal animationType={animationType} visible={isVisible} transparent={true} onRequestClose={() => setVisible(!closeOnBack)}>
            <View style={[styles.root, {backgroundColor}]}>
                <View style={[styles.modalContener, style]}>{children}</View>

                <View style={styles.bottomOpations}>
                    <AnimateButton style={styles.closeBtn}>
                        <FeatherIcons name="plus" size={16} color={'white'} style={{transform: 'rotate(45deg)'}} />
                    </AnimateButton>
                    
                    <View style={styles.actionsButtonsBox}>
                        {
                            actionButtons.map(({title, onPress, color, backgroundColor}) => (
                                <AnimateButton key={title}>
                                    <RoundedView title={title} style={{borderWidth: 1, borderColor: 'gray'}} titleFrontSize={14} />
                                </AnimateButton>
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
        paddingInline: 2,
    },

    modalContener: {
        width: '100%',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: 'gray',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
        paddingTop: 20
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
        paddingInline: 20
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