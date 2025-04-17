import { Animated, Dimensions, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimateButton from "./AnimateButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef, useState } from "react";
import FeatherIcons from 'react-native-vector-icons/Feather';


export default function BottomTabNavbar({navigation, state}: BottomTabBarProps): React.JSX.Element {
    
    const currentRouteName = state.routes[state.index].name;
    const isActive = (route: string) => route === currentRouteName;

    const isHide = ['transition'].includes(currentRouteName);
    if(isHide) return <></>

    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const {height: screenInnerHeight} = Dimensions.get('screen');

    const translateY = useRef<Animated.Value>(new Animated.Value(screenInnerHeight)).current;
    const ballsOpacityAnime = useRef<Animated.Value>(new Animated.Value(0)).current;
    const rotateMenuAnime = useRef<Animated.Value>(new Animated.Value(0)).current;

    const incomeAnime = useRef<Animated.ValueXY>(new Animated.ValueXY({x: 0, y: 0})).current;
    const expensesAnime = useRef<Animated.ValueXY>(new Animated.ValueXY({x: 0, y: 0})).current;
    const transferAnime = useRef<Animated.ValueXY>(new Animated.ValueXY({x: 0, y: 0})).current;

    function handleMenu(){
        setMenuOpen(menu => !menu);
    }

    function handleMenuAnime(isOpen: Boolean): void{
        Animated.parallel([
            Animated.timing(incomeAnime, {
                toValue: isOpen ? {x: -100, y: -100} : {x: 0, y: 0}, duration: 150, useNativeDriver: true
            }),
            Animated.timing(expensesAnime, {
                toValue: isOpen ? {x: 0, y: -150} : {x: 0, y: 0}, duration: 150, useNativeDriver: true
            }),
            Animated.timing(transferAnime, {
                toValue: isOpen ? {x: 100, y: -100} : {x: 0, y: 0}, duration: 150, useNativeDriver: true
            }),
            Animated.timing(ballsOpacityAnime, {
                toValue: isOpen ? 1 : 0, duration: 50, useNativeDriver: true
            }),
            Animated.timing(rotateMenuAnime, {
                toValue: isOpen ? 1 : 0, duration: 100, useNativeDriver: true
            }),
            Animated.timing(translateY, {
                toValue: isOpen ? 0 : screenInnerHeight, duration: 100, useNativeDriver: true
            })
        ]).start()
    }

    useEffect(() => {
        handleMenuAnime(isMenuOpen);
    }, [isMenuOpen])

    return (<>
        <View style={[styles.center, {position: 'relative'}]}>
            <View style={[styles.navbarContener]}>
                <AnimateButton style={styles.navigatorBtn} onPress={() => navigation.navigate('home')} >
                    <MaterialIcons name="home" size={22} color={isActive('home') ? 'royalblue' : 'white'} />
                    <Text style={[styles.navigatorBtn_text, {color: isActive('home') ? 'royalblue' : 'white'}]}>Home</Text>
                </AnimateButton>

                <AnimateButton style={styles.navigatorBtn} onPress={() => navigation.navigate('accounts')}>
                    <MaterialIcons name="account-balance-wallet" size={22} color={isActive('accounts') ? 'royalblue' : 'white'} />
                    <Text style={[styles.navigatorBtn_text, {color: isActive('accounts') ? 'royalblue' : 'white'}]}>Accounts</Text>
                </AnimateButton>
            </View>


            {
                currentRouteName === 'home' ? (
                    <View style={[styles.center, {position: 'absolute', width: "100%", height: 60, flexDirection: 'row'}]}>
                        <Animated.View style={[styles.center, styles.menuBackCover, {height: screenInnerHeight, transform: [{translateY}]}]}>
                        </Animated.View>

                        <Animated.View 
                            style={[styles.center, {transform: incomeAnime.getTranslateTransform(), top: -32, position: 'absolute', opacity: ballsOpacityAnime}]}
                        >
                            <Pressable 
                                onPress={() => {
                                    handleMenu();
                                    navigation.navigate('transition', {mode: 'income'})
                                }} 
                                style={[styles.animateBalls, styles.center, {backgroundColor: 'rgb(25,200,150)'}]}
                            >
                                <FeatherIcons name="download" size={24} color={'white'} />
                            </Pressable>
                            <Text style={styles.animateBalls_text}>ADD</Text>
                            <Text style={styles.animateBalls_text}>INCOME</Text>
                        </Animated.View>

                        <Animated.View 
                            style={[styles.center, {transform: expensesAnime.getTranslateTransform(), top: -32, position: 'absolute', opacity: ballsOpacityAnime}]}
                        >
                            <Pressable
                                onPress={() => {
                                    handleMenu();
                                    navigation.navigate('transition', {mode: 'expenses'})
                                }} 
                                style={[styles.animateBalls, styles.center, {backgroundColor: 'gray'}]}
                            >
                                <FeatherIcons name="upload" size={24} color={'white'} />
                            </Pressable>
                            <Text style={styles.animateBalls_text}>ADD</Text>
                            <Text style={styles.animateBalls_text}>EXPENSE</Text>
                        </Animated.View>

                        <Animated.View 
                            style={[styles.center, {transform: transferAnime.getTranslateTransform(), top: -32, position: 'absolute', opacity: ballsOpacityAnime}]}
                        >
                            <Pressable 
                                onPress={() => {
                                    handleMenu();
                                    navigation.navigate('transition', {mode: 'transfer'})
                                }}
                                style={[styles.animateBalls, styles.center, {backgroundColor: 'rgb(130, 100, 255)'}]}
                            >
                                <FeatherIcons name="shuffle" size={24} color={'white'} />
                            </Pressable>
                            <Text style={styles.animateBalls_text}>ACCOUNT</Text>
                            <Text style={styles.animateBalls_text}>TRANSFER</Text>
                        </Animated.View>
                    </View>
                ) : null
            }

            <View style={[styles.center, {width: '100%', position: 'absolute'}]}>
                <AnimateButton style={styles.createBtn} 
                    onPress={handleMenu}
                >
                    <Animated.View style={{transform: [{rotate: rotateMenuAnime.interpolate({inputRange: [0, 1], outputRange: ['0deg', '45deg']})}]}}>
                        <MaterialIcons name="add" color={'white'} size={22} />
                    </Animated.View>
                </AnimateButton>
            </View>
        </View>
    </>)
}

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    navbarContener: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        backgroundColor: 'rgb(25, 25, 25)',
        paddingInline: 20,
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
        top: -32, 
        backgroundColor: 'royalblue',
        borderRadius: 100,
    },

    menuBackCover: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.90)',
        alignSelf: 'flex-end'
    },

    animateBalls: {
        width: 64,
        aspectRatio: 1,
        borderRadius: 1000,
        backgroundColor: 'royalblue',
        margin: 10
    },

    animateBalls_text: {
        fontWeight: 900,
        color: 'white',
        fontSize: 12,
        opacity: 0.7
    }
})

