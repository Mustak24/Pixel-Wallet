import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnimateButton from "./Buttons/AnimateButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef, useState } from "react";
import FeatherIcons from 'react-native-vector-icons/Feather';
import BottomModal from "./Modal/BottomModal";
import Calculator from "./Calculator";
import AccountModal from "../Database/Models/AccountModal";
import { useAppContext } from "../Contexts/AppContext";
import TextTheme from "./Text/TextTheme";
import { useTheme } from "../Contexts/ThemeProvider";
import { useAlert } from "./Alert/AlertProvider";


export default function BottomTabNavbar({navigation, state}: BottomTabBarProps): React.JSX.Element {

    const {primaryColor: color, secondaryBackgroundColor} = useTheme()

    const currentRouteName = state.routes[state.index].name;
    const isActive = (route: string) => route === currentRouteName;

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
        if(currentRouteName == 'home-stack-navigator') handleMenuAnime(isMenuOpen);
    }, [isMenuOpen])

    return (<>
        <View style={[styles.center, {position: 'relative', backgroundColor: secondaryBackgroundColor}]}>
            <View style={[styles.navbarContener, {backgroundColor: secondaryBackgroundColor}]}>
                <AnimateButton delay={10} style={styles.navigatorBtn} onPress={() => navigation.navigate('home-stack-navigator')} >
                    <MaterialIcons name="home" size={22} color={isActive('home-stack-navigator') ? 'royalblue' : color} />
                    <Text style={[styles.navigatorBtn_text, {color: isActive('home-stack-navigator') ? 'royalblue' : color}]}>Home</Text>
                </AnimateButton>

                <AnimateButton delay={10} style={styles.navigatorBtn} onPress={() => navigation.navigate('accounts-stack-navigator')}>
                    <MaterialIcons name="account-balance-wallet" size={22} color={isActive('accounts-stack-navigator') ? 'royalblue' : color} />
                    <Text style={[styles.navigatorBtn_text, {color: isActive('accounts-stack-navigator') ? 'royalblue' : color}]}>Accounts</Text>
                </AnimateButton>
            </View>


            {
                currentRouteName === 'home-stack-navigator' ? (
                    <View style={[styles.center, {position: 'absolute', width: "100%", height: 80, flexDirection: 'row'}]}>
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
                                    navigation.navigate('transition', {mode: 'expense'})
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
                ) : currentRouteName === 'accounts-stack-navigator' ? (
                    <CreateAccountModal visible={isMenuOpen} setVisible={setMenuOpen} />
                ) : null
            }

            <View style={[styles.center, {width: '100%', position: 'absolute'}]}>
                <AnimateButton delay={10} style={styles.createBtn} 
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


const colors = ['rgb(170,50,50)', 'rgb(170,100,50)', 'rgb(170,140,50)', 'rgb(170,170,50)', 'rgb(50,170,100)', 'rgb(25,200,150)', 'rgb(50,150,120)', 'rgb(50,170,170)','rgb(50,130,170)', 'rgb(50,100,170)','rgb(100,50,170)', 'rgb(120,50,170)', 'rgb(170,50,150)', 'rgb(170,50,100)']


type CreateAccountModalProps = {
    visible: boolean,
    setVisible: (vis: boolean) => void
}

function CreateAccountModal({visible, setVisible}: CreateAccountModalProps): React.JSX.Element {

    const {setAccounts, setTotalBalance} = useAppContext();
    const {primaryColor: color} = useTheme();
    const {alert, setAlert} = useAlert();

    const [name, setName] = useState<string>('');
    const [balance, setBalance] = useState<number>(0);
    const [backgroundColor, setBackgroundColor] = useState<string>('rgb(25,200,150)');

    const [isCalOpen, setCalOpen] = useState(false);

    function create() {
        if(!name) return setAlert({type: 'error', massage: 'Plase enter account name', id: 'modal'});
        AccountModal.create({name, balance, backgroundColor});

        setName('');
        setBalance(0);
        setVisible(false);

        setAccounts(AccountModal.getAll());
        setTotalBalance(AccountModal.getTotalBalance());
    }

    return (
        <BottomModal visible={visible} setVisible={setVisible} actionButtons={[{title: 'Add', onPress: create, backgroundColor: 'rgb(25, 200, 150)'}]}  >
            <View style={{paddingBlock: 10}}>
                <View style={{display: 'flex', paddingInline: 20, width: '100%'}}>
                    <TextTheme style={{color: 'white', fontSize: 18, fontWeight: 900}}>Account Options</TextTheme>

                    <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10, width: '100%', position: 'relative', marginBlock: 20}}>
                        <MaterialIcons name="account-balance-wallet" size={22} color={'rgba(255,255,255,.6)'} style={{backgroundColor, padding: 10, borderRadius: 1000}} />
                        <View style={{display: 'flex', justifyContent: 'flex-end', flex: 1}}>
                            <TextInput 
                                value={name} 
                                placeholder="Account Name"
                                placeholderTextColor={color} 
                                style={{fontSize: 18, fontWeight: '900', color, opacity: name ? 1 : 0.5}} 
                                onChangeText={setName}
                            />
                            <View style={{width: '100%', backgroundColor: 'gray', height: 1, position: 'relative', top: -5}}></View>
                        </View>
                    </View>
                </View>

                <TextTheme style={{paddingInline: 20, marginBlock: 10, color: 'white', fontSize: 16, fontWeight: 900}}>Select Color</TextTheme>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBlock: 20}} >
                    {
                        colors.map(color => (
                            <Pressable 
                                key={color} 
                                onPress={() => setBackgroundColor(color)} 
                                style={{display: 'flex', width: 40, aspectRatio: 1, borderRadius: 100, boxSizing: 'border-box', position: 'relative', marginLeft: 10, backgroundColor: color}}
                            >
                                {
                                    backgroundColor == color ? (
                                        <View style={{width: 40, aspectRatio: 1, borderWidth: 3, borderColor: 'rgba(255,255,255,.6)', borderRadius: 100}}></View>
                                    ) : null
                                }
                            </Pressable>
                        ))
                    }
                </ScrollView>

                <Pressable onPress={() => setCalOpen(true)} style={{marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <TextTheme style={{color: 'white', opacity: .5, fontSize: 10, fontWeight: 800}}>Enter Account Balance</TextTheme>
                    <TextTheme style={{color: 'white', fontSize: 28, fontWeight: 900}}>
                        <Text>{balance || '0.00'}</Text>
                        <Text> INR</Text>
                    </TextTheme>
                </Pressable>

                <BottomModal visible={isCalOpen} setVisible={setCalOpen} actionButtons={[{title: 'Set', onPress: () => setCalOpen(false), backgroundColor}]} >
                    <TextTheme style={{color: 'white', fontSize: 14, fontWeight: 800, paddingLeft: 20, marginBottom: 20, opacity: .6}}>Enter Account Balance :</TextTheme>
                    <Calculator value={balance} onResult={setBalance} />
                </BottomModal>
            </View>
        </BottomModal>
    )
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
        height: 80,
        justifyContent: 'space-between',
        backgroundColor: 'rgb(25, 25, 25)',
        paddingInline: 20,
        paddingBottom: 10
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

