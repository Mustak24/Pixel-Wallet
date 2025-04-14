import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimateButton from "./AnimateButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";



export default function BottomTabNavbar({navigation, state}: BottomTabBarProps): React.JSX.Element {

    const currentRouteName = state.routes[state.index].name;

    const isActive = (route: string) => route === currentRouteName;

    return (
        <View style={[styles.navbarContener]}>
            <AnimateButton style={styles.navigatorBtn} onPress={() => navigation.navigate('home')} >
                <MaterialIcons name="home" size={22} color={isActive('home') ? 'royalblue' : 'white'} />
                <Text style={[styles.navigatorBtn_text, {color: isActive('home') ? 'royalblue' : 'white'}]}>Home</Text>
            </AnimateButton>

            <AnimateButton style={styles.createBtn}>
                <MaterialIcons name="add" color={'white'} size={22}/>
            </AnimateButton>

            <AnimateButton style={styles.navigatorBtn} onPress={() => navigation.navigate('accounts')}>
                <MaterialIcons name="account-balance-wallet" size={22} color={isActive('accounts') ? 'royalblue' : 'white'} />
                <Text style={[styles.navigatorBtn_text, {color: isActive('accounts') ? 'royalblue' : 'white'}]}>Accounts</Text>
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