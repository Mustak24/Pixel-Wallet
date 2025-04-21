import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import AnimateButton from "../components/AnimateButton";
import FeatherIcons from 'react-native-vector-icons/Feather';
import { useContext, useEffect, useState } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { stackParamsList } from "../../App";
import RoundedView from "../components/RoundedView";
import BottomModal from "../components/BottomModal";
import Calculator from "../components/Calculator";
import TransitionModal from "../Database/Models/TransitionModal";
import AccountModal from "../Database/Models/AccountModal";
import { AppContext } from "../Contexts/App";


type transitionInfoType = {
    mode: transitionMode,
    backgroundColor: string,
    title: string,
    iconName: string
}

type transitionMode = 'income' | 'expenses' | 'transfer';

type TransitionProps = BottomTabScreenProps<stackParamsList, 'transition'>


const transitionInfo: transitionInfoType[] = [
    {
        mode: 'income',
        backgroundColor: 'rgb(25,200,150)',
        iconName: 'download',
        title: 'Add to money'
    },

    {
        mode: 'expenses',
        backgroundColor: 'gray',
        iconName: 'upload',
        title: 'Pay with'
    },

    {
        mode: 'transfer',
        backgroundColor: 'rgb(130,100,255)',
        iconName: 'shuffle',
        title: 'From'
    }
]

const mouths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


export default function Transition({route, navigation}: TransitionProps): React.JSX.Element {

    const {accounts, setTotalBalance, setAccounts} = useContext(AppContext)

    const [amount, setAmount] = useState<number>(0)
    const [transitionMode, setTransitionMode] = useState<transitionMode>(route.params.mode);
    const [fromAccount, setFromAccount] = useState<AccountModal>(accounts[0]);
    const [toAccount, setToAccount] = useState<AccountModal>(accounts[0]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth())
    const [date, setDate] = useState<number>(new Date().getDate())
    const [hour, setHour] = useState<number>(new Date().getHours())
    const [minute, setMinute] = useState<number>(new Date().getMinutes())

    const [isDescriptionModalOpen, setDescriptionModalOpen] = useState<boolean>(false);
    
    const [paddingBottom, setPaddingBottom] = useState<number>(0) 
    const getTransitonInfo = () => transitionInfo[transitionMode == 'income' ? 0 : transitionMode == 'expenses' ? 1 : 2]



    function createTransiton() {
        let tra = TransitionModal.create({
            title, description, fromAccountId: fromAccount.id, mode: transitionMode, amount, 
            createOn: {year, month, date, hour, minute}, 
            toAccountId: toAccount.id
        });

        if(!tra) return;

        setTotalBalance(AccountModal.getTotalBalance());
        setAccounts(AccountModal.getAll());
        navigation.navigate('home')
    }

    useEffect(() => {
        let unsubscribe = navigation.addListener('focus', () => {
            setFromAccount(accounts[0]);
            setToAccount(accounts[0]);
            setAmount(0);
            setTitle('');
            setDescription('');
            setYear(new Date().getFullYear())
            setMonth(new Date().getMonth())
            setDate(new Date().getDate())
            setHour(new Date().getHours())
            setMinute(new Date().getMinutes())
            setPaddingBottom(0);
        })
        return unsubscribe;
    }, [navigation])


    useEffect(() => {
        setTransitionMode(route.params.mode)
    }, [route.params])

    
    return (<>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.root, {paddingBottom}]}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.topNav}>
                    <AnimateButton style={styles.topNav_closeBtn} onPress={() => navigation.navigate('home')}>
                        <FeatherIcons name="plus" size={20} color={'white'} style={{transform: 'rotate(45deg)'}} />
                    </AnimateButton>

                    <View style={[styles.center, {flexDirection: 'row', gap: 6}]}>
                        {
                            transitionInfo.map(({backgroundColor, iconName, mode}) => (
                                <AnimateButton 
                                key={mode}
                                style={{
                                    ...styles.topNav_modeSelector, 
                                    backgroundColor: mode == transitionMode ?  backgroundColor : 'transparent'
                                }} 
                                onPress={() => setTransitionMode(mode)}
                                >
                                        <FeatherIcons
                                            color={'white'} 
                                            size={20}
                                            name={iconName} 
                                            />
                                    </AnimateButton>
                                )
                            )
                        }
                    </View>
                </View>

                <View style={{marginBlock: 20}}>
                    <TextInput 
                        value={title}
                        style={styles.titleInput} 
                        placeholder={`${transitionMode[0].toLocaleUpperCase() + transitionMode.slice(1)} title`} 
                        onFocus={() => setPaddingBottom(20)}
                        onBlur={() => setPaddingBottom(0)}
                        onChangeText={setTitle}
                        />
                </View>

                <View style={[styles.center, {gap: 10}]}>
                    <AnimateButton style={{display: 'flex', padding: 20, borderRadius: 20, backgroundColor: 'rgb(24,24,24)', width: '100%', justifyContent: 'center'}} onPress={() => setDescriptionModalOpen(true)}>
                        <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 14}}>
                            <FeatherIcons name="align-left" size={20} color={'white'} />
                            <Text style={{color: 'white', fontWeight: '900'}}>Add description</Text>
                        </View>
                        {description && <Text style={{color: 'white', fontSize: 12, opacity: 0.8}} numberOfLines={8}>{description}</Text>}
                    </AnimateButton>

                    <AnimateButton style={{...styles.box, justifyContent: 'space-between'}}>
                        <View style={[styles.center, {gap: 14, flexDirection: 'row'}]}>
                            <FeatherIcons name="calendar" size={20} color={'white'} />
                            <Text style={{color: 'white', fontWeight: '900', opacity: 0.4}}>Created on</Text>
                        </View>
                        <Text style={{color: 'white', fontWeight: '900'}}>
                            {mouths[month]} {hour%12 || 12}:{minute < 10 ? `0${minute}` : minute} {hour >= 12 ? 'PM' : 'AM'}
                        </Text>
                    </AnimateButton>
                </View>
            </ScrollView>

            <View style={styles.bottomOpationContener}>
                <AmountBox 
                    heading={getTransitonInfo().title} 
                    accounts={accounts} 
                    amount={amount} 
                    setAmount={setAmount} 
                    fromAccount={fromAccount}
                    setFromAccount={setFromAccount}
                    mode={transitionMode}
                    toAccount={toAccount}
                    setToAccount={setToAccount}
                />

                <View style={styles.bottomOpations}>
                    <AnimateButton style={styles.closeBtn}  onPress={() => navigation.navigate('home')}>
                        <FeatherIcons name="plus" size={16} color={'white'} style={{transform: 'rotate(45deg)'}} />
                    </AnimateButton>
                    
                    <View style={styles.actionsButtonsBox}>
                        <AnimateButton style={{...styles.actionBtn, backgroundColor: 'rgb(25,200,150)'}} onPress={createTransiton}>
                            <Text style={{color: 'white', fontWeight: '900'}}>Save</Text>
                        </AnimateButton>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>

        <BottomModal 
            visible={isDescriptionModalOpen} 
            setVisible={setDescriptionModalOpen} 
            style={{paddingInline: 20}}
            actionButtons={[{title: 'Add', backgroundColor: 'rgb(25,200,150)', onPress: () => setDescriptionModalOpen(false)}]}
        >
            <Text style={{color: 'white', fontSize: 16, fontWeight: '900', paddingLeft: 8}}>Add Description</Text>
            <TextInput 
                value={description}
                style={{fontSize: 14, color: 'white', maxHeight: 280, opacity: 0.8}} 
                multiline={true}
                placeholder="Add description ..." 
                onChangeText={setDescription}
            />
        </BottomModal>
    </>)
}


type AmountBoxProps = {
    heading: string,
    accounts: AccountModal[],
    amount: number,
    setAmount: (amount: number) => void
    mode: transitionMode,
    fromAccount: AccountModal,
    setFromAccount: (acc: AccountModal) => void,
    toAccount: AccountModal,
    setToAccount: (acc: AccountModal) => void
}

function AmountBox({heading, accounts, setFromAccount, amount, setAmount, mode, setToAccount, fromAccount, toAccount}: AmountBoxProps){

    const [isOpenCal, setOpenCal] = useState<boolean>(true);

    return (
        <View style={{display: 'flex', width: '100%', alignItems: 'flex-start'}} >

            <AccountSelector accounts={accounts} useAccount={fromAccount} setUseAccount={setFromAccount} title={heading}/>

            {mode == 'transfer' && <AccountSelector accounts={accounts} useAccount={toAccount} setUseAccount={setToAccount} title="To" />}

            <Pressable style={[styles.center, {width: '100%', alignSelf: 'center', marginBottom: 20}]} onPress={() => setOpenCal(true)}>
                <Text style={{fontWeight: 800, fontSize: 14, color: 'white', opacity: 0.6}}>Enter Amount</Text>
                <Text style={{fontWeight: '900', fontSize: 28, color: 'white'}}>
                    <Text>{amount || '0.00'}</Text>
                    <Text> INR</Text>
                </Text>
            </Pressable>

            <BottomModal 
                visible={isOpenCal} 
                setVisible={setOpenCal}
                backgroundColor="rgba(0,0,0,.8)" 
                style={{backgroundColor: 'black', paddingInline: 20}}
                actionButtons={[
                    {
                        title: 'Set', 
                        backgroundColor: "rgb(25,200,150)",
                        onPress: () => setOpenCal(false), 
                    }
                ]}
            >
                <AccountSelector accounts={accounts} useAccount={fromAccount} setUseAccount={setFromAccount} title={heading}/>

                <Calculator onResult={setAmount} value={amount}/>
            </BottomModal>
        </View>
    )
}


function AccountSelector({accounts, useAccount, setUseAccount, title}: {accounts: AccountModal[], useAccount: AccountModal, setUseAccount: (acc: AccountModal) => void, title: string}) {
    
    return (
        <View style={{display: 'flex', width: '100%', alignItems: 'flex-start'}} >
            <Text style={{color: 'white', fontSize: 16, fontWeight: '900', paddingLeft: 20}}>{title}</Text>

            <ScrollView style={{width: '100%', height: 50, marginBlock: 16}} horizontal={true} showsHorizontalScrollIndicator={false} >   
                {
                    accounts.map((acc) => {
                        return (
                            <Pressable key={acc.name} onPress={() => setUseAccount(acc)} style={{marginLeft: 16}}>
                                <RoundedView  
                                    key={acc.id} 
                                    title={acc.name} 
                                    color="white" 
                                    backgroundColor={acc.id == useAccount.id ? acc.backgroundColor : 'transparent'}
                                    style={{borderWidth: 1, borderColor: 'gray'}} 
                                />
                            </Pressable>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    
    root:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        paddingTop: 44,
    },
    
    scrollView: {
        display: 'flex',
        width: '100%',
        height: '100%',
        paddingBlock: 10,
        paddingInline: 20
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
        height: 50
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
        height: 44,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 1000,
        gap: 4
    },

    titleInput: {
        width: '100%',
        height: 60,
        fontSize: 24,
        fontWeight: 900,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        color: "white"
    },

    box: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        paddingInline: 20,
        gap: 14,
        backgroundColor: "rgb(24,24,24)",
        borderRadius: 20,
        width: "100%",
        height: 60
    },

    bottomOpationContener: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginInline: 2,
        paddingTop: 20,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: 'gray',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%'
    },

    bottomOpations: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        borderBottomWidth: 0,
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
    },

    actionBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: 20,
        height: 40,
        borderRadius: 100,
        borderColor: 'gray',
        borderWidth: 1
    }
})

