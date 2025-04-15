import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AnimateButton from "./AnimateButton";
import FeatherIcons from 'react-native-vector-icons/Feather';
import { useState } from "react";


type CreateTransitionProps = {
    transitionMode: 'income' | 'expenses' | 'transfer' | 'none',
    setTransitionMode: Function,

}


export default function CreateTransition({transitionMode, setTransitionMode}: CreateTransitionProps): React.JSX.Element {

    const transitionInfo = {
        backgroundColor: transitionMode == 'income' ? 'rgb(25,200,150)' : transitionMode == 'expenses' ? 'gray' : 'rgb(130, 100, 255)',
        iconName: transitionMode == 'income' ? 'download' : transitionMode == 'expenses' ? 'upload' : 'shuffle',
        title: transitionMode[0].toLocaleUpperCase() + transitionMode.slice(1)
    }

    return transitionMode == 'none' ? <View></View> : (
        <View style={styles.root}>
            <View style={styles.topNav}>
                <AnimateButton style={styles.topNav_closeBtn} onPress={() => setTransitionMode('none')}>
                    <FeatherIcons name="plus" size={20} color={'white'} style={{transform: 'rotate(45deg)'}} />
                </AnimateButton>

                <AnimateButton style={{...styles.topNav_modeSelector, backgroundColor: transitionInfo.backgroundColor}} >
                    <FeatherIcons
                        color={'white'} 
                        size={20}
                        name={transitionInfo.iconName} 
                    />
                    <Text style={{color: 'white', fontSize: 14, fontWeight: 800}}>
                        {transitionInfo.title}
                    </Text>
                </AnimateButton>
            </View>

            <View style={{marginBlock: 20}}>
                <TextInput style={styles.titleInput} placeholder={`${transitionInfo.title} title`} />
            </View>

            <View style={styles.amountBox}>

                <View style={styles.amountBox_bottomPart}>
                    <View style={{backgroundColor: 'gray', height: 2, width: '100%', position: 'absolute', opacity: 0.5}}></View>

                    <AnimateButton style={{...styles.center, width: 36, aspectRatio: 1, borderColor: 'gray', borderWidth: 1,
                         borderRadius: 1000, backgroundColor: 'rgb(15,15,15)', marginInline: 20
                    }}>
                       <FeatherIcons name="chevron-down" size={18} color={'white'} /> 
                    </AnimateButton>

                    <Pressable style={[styles.center, {flexDirection: 'row', gap: 10, height: 44, paddingInline: 20, borderRadius: 1000, backgroundColor: 'royalblue', marginInline: 20}]}>
                        <FeatherIcons name="plus" size={18} color={'white'} />
                        <Text style={{color: 'white', fontWeight: 900}}>Add</Text>
                    </Pressable>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        backgroundColor: 'black',
        paddingTop: 64,
        width: '100%',
        height: '100%'
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    topNav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        paddingInline: 20
    },

    topNav_closeBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        aspectRatio: 1,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: 'gray'
    },

    topNav_modeSelector: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingInline: 20,
        height: 44,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 1000,
        gap: 4
    },

    titleInput: {
        width: '100%',
        height: 44,
        fontSize: 24,
        fontWeight: 900,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },

    amountBox: {
        display: 'flex',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: 'gray',
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(15, 15, 15)'
    },

    amountBox_bottomPart: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingBlock: 10,
    }
})