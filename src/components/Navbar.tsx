import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimateButton from "./AnimateButton";

export default function Navbar(): React.JSX.Element {
    return (
        <View style={[styles.navbarContener]}>
            <AnimateButton style={styles.navigatorBtn}>
                <MaterialIcons name="home" size={22} color={'white'} />
                <Text style={styles.navigatorBtn_text}>Home</Text>
            </AnimateButton>

            <AnimateButton style={styles.createBtn}>
                <MaterialIcons name="add" color={'white'} size={22}/>
            </AnimateButton>

            <AnimateButton style={styles.navigatorBtn}>
                <MaterialIcons name="account-balance-wallet" size={22} color={'white'} />
                <Text style={styles.navigatorBtn_text}>Accounts</Text>
            </AnimateButton>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContener: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        backgroundColor: 'rgb(25, 25, 25)',
        paddingInline: 20
    },

    navigatorBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        height: 40,
        paddingInline: 20,
        borderRadius: 100,
        width: 120
    },

    navigatorBtn_text: {
        color: 'white',
        fontWeight: '900',
        fontSize: 12
    },

    createBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative', 
        width: 64, 
        aspectRatio: 1, 
        alignSelf: 'flex-start', 
        top: -32, 
        backgroundColor: 'royalblue',
        borderRadius: 100,
    },
})