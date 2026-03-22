import { memo, useRef, useState } from "react";
import { TextTheme, ThemeView, useTheme } from "../Contexts/ThemeProvider";
import AnimateButton from "./Buttons/AnimateButton";
import MaterialIcon from "./Icon/MaterialIcon";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Animated, Pressable, View } from "react-native";
import useBinaryAnimateValue from "../Hooks/useBinaryAnimatedValue";
import SafeAreaFromBottom from "./SafeAreaView/SafeAreaFromBottom";
import FeatherIcon from "./Icon/FeatherIcon";
import navigator from "../Navigation/NavigationService";
import CreateAccountModal from "./Modal/CreateAccountModal";

export default function BottomTabNavbar({navigation, state}:BottomTabBarProps): React.JSX.Element {

    const currentRouteName = state.routes[state.index].name;
    const isActive = (route: string) => route === currentRouteName;

    return (
        <ThemeView isPrimary={false} style={{paddingInline: 20, position: 'relative'}} >
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12}} >
                <NavigationButton
                    text="Home"
                    icon="home"
                    isActive={isActive('home-screen')}
                    onPress={() => navigation.navigate('home-screen')}
                />

                <NavigationButton
                    text="Accounts"
                    icon="account-balance-wallet"
                    isActive={isActive('account-screen')}
                    onPress={() => navigation.navigate('account-screen')}
                />

                {
                    isActive('home-screen') ? (
                        <HomeScreenCreateButton/>
                    ) : (
                        <AccountScreenCreateButton/>
                    )
                }
            </View>

            <SafeAreaFromBottom/>
        </ThemeView>
    )
}

const NavigationButton = memo(({text, onPress, icon, isActive}: {text: string, onPress: () => void, icon: string, isActive: boolean}) => {
    return (
        <AnimateButton style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, height: 44, paddingInline: 20, borderRadius: 40, width: 120, marginBlock: 8}} onPress={onPress} >
            <MaterialIcon name={icon} size={22} color={isActive ? 'royalblue' : ''} />
            <TextTheme color={isActive ? 'royalblue' : ''} style={{fontSize: 12, fontWeight: '900'}}>{text}</TextTheme>
        </AnimateButton>
    )
})



const HomeScreenCreateButton = memo(() => {

    const {secondaryBackgroundColor} = useTheme()

    const animate0to1 = useBinaryAnimateValue({value: 0, duration: 300})

    const modesInfo = useRef([
        {title: 'ADD INCOME', icon: 'download', bg: 'rgb(50,200,150)', x: -100, y: -100, mode: 'income'},
        {title: 'ADD EXPENSE', icon: 'upload', bg: 'gray', x: 0, y: -150, mode: 'expense'},
        {title: 'ACCOUNT TRANSFER', icon: 'shuffle', bg: 'rgb(130, 100, 255)', x: 100, y: -100, mode: 'transfer'},
    ]).current;


    function handleMenu() {
        if(animate0to1.valueRef.current) {
            animate0to1.animateTo0();
        } else {
            animate0to1.animateTo1();
        }
    }


    return (
        <View style={{position: 'absolute', top: 0, left: '50%', transform: [{translateY: '-50%'}, {translateX: '-50%'}]}} >
            <Pressable 
                style={{position: 'absolute'}} 
                onPress={() => animate0to1.animateTo0()}
            >
                <Animated.View
                    style={{
                        width: 50, height: 50, borderRadius: 50, backgroundColor: secondaryBackgroundColor, opacity: 0.9, position: 'absolute',
                        transform: [{scale: animate0to1.value.interpolate({
                            inputRange: [0, 1], outputRange: [1, 50]
                        })}]
                    }}
                />
            </Pressable>


            {
                modesInfo.map((info, index) => (
                    <Animated.View
                        key={index}
                        style={{
                            position: 'absolute', alignItems: 'center', justifyContent: 'center', gap: 4,
                            opacity: animate0to1.value,
                            transform: [
                                { translateX: animate0to1.value.interpolate({inputRange: [0, 1], outputRange: [0, info.x]}) },
                                { translateY: animate0to1.value.interpolate({inputRange: [0, 1], outputRange: [0, info.y]}) },
                                { scale: animate0to1.value.interpolate({inputRange: [0, 1], outputRange: [0.2, 1]}) }
                            ]
                        }}
                    >
                        <AnimateButton 
                            style={{width: 64, height: 64, borderRadius: 100, backgroundColor: info.bg, alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => {
                                navigator.navigate('transaction-screen', {mode: info.mode as 'income' | 'expense' | 'transfer'})
                                animate0to1.animateTo0()
                            }} 
                        >
                            <FeatherIcon name={info.icon} size={24} color={'white'} />
                        </AnimateButton>
                        
                        {
                            info.title.split(' ').map(text => (
                                <Animated.View 
                                    key={text}
                                    style={{
                                        transform: [{scale: animate0to1.value}]
                                    }} 
                                >
                                    <TextTheme color="white" style={{fontSize: 11, textAlign:'center', fontWeight: '900'}}>
                                        {text}
                                    </TextTheme>
                                </Animated.View>
                            ))
                        }
                    </Animated.View>
                ))
            }

            <AnimateButton style={{alignItems: 'center', justifyContent: 'center', width: 64, height: 64, backgroundColor: 'rgb(100,140,255)', borderRadius: 100}} 
                onPress={handleMenu}
            >
                <Animated.View style={{transform: [{rotate: animate0to1.value.interpolate({inputRange: [0, 1], outputRange: ['0deg', '45deg']})}]}}>
                    <MaterialIcon name="add" color={'white'} size={22} />
                </Animated.View>
            </AnimateButton>
        </View>
    )
})


const AccountScreenCreateButton = memo(() => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <View style={{position: 'absolute', top: 0, left: '50%', transform: [{translateY: '-50%'}, {translateX: '-50%'}]}} >
            <AnimateButton style={{alignItems: 'center', justifyContent: 'center', width: 64, height: 64, backgroundColor: 'rgb(100,140,255)', borderRadius: 100}} 
                onPress={_ => setMenuOpen(true)}
            >
                <MaterialIcon name="add" color={'white'} size={22} />
            </AnimateButton>

            <CreateAccountModal 
                visible={isMenuOpen} setVisible={setMenuOpen}
            />
        </View>
    )
})