import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import AnimateButton from "../Components/Buttons/AnimateButton";
import FeatherIcons from 'react-native-vector-icons/Feather';
import { useEffect, useState } from "react";
import BottomModal from "../Components/Modal/BottomModal";
import TransitionModal from "../Database/Models/TransitionModal";
import AccountModal from "../Database/Models/AccountModal";
import { useAppContext } from "../Contexts/AppContext";
import AccountSelector from "../Components/AccountSelector";
import { TextTheme, useTheme } from "../Contexts/ThemeProvider";
import style from '../../AppStyle'
import CategorySelectorModal from "../Components/Modal/CategorySelectorModal";
import navigator from "../Navigation/NavigationService";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootNavigationParamsList } from "../Navigation/RootNavigation";
import Calculator from "../Components/Other/Calculator";
import SafePaddingView from "../Components/SafeAreaView/SafePaddingView";


type transitionInfoType = {
    mode: transitionMode,
    backgroundColor: string,
    title: string,
    iconName: string
}

type transitionMode = 'income' | 'expense' | 'transfer';


const transitionInfo: transitionInfoType[] = [
    {
        mode: 'income',
        backgroundColor: 'rgb(25,200,150)',
        iconName: 'download',
        title: 'Add to money'
    },

    {
        mode: 'expense',
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


export default function TransitionScreen(): React.JSX.Element {

    const {params} = useRoute<RouteProp<RootNavigationParamsList, 'transition-screen'>>();

    const {accounts, setTotalBalance, setAccounts, setNeedTransitionRefresh} = useAppContext();
    const {primaryColor: color, primaryBackgroundColor: backgroundColor, secondaryBackgroundColor} = useTheme()

    const [amount, setAmount] = useState<number>(0)
    const [transitionMode, setTransitionMode] = useState<transitionMode>(params.mode);
    const [fromAccount, setFromAccount] = useState<AccountModal>(params.account ?? accounts[0]);
    const [toAccount, setToAccount] = useState<AccountModal>(params.account ?? accounts[0]);
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth())
    const [date, setDate] = useState<number>(new Date().getDate())
    const [hour, setHour] = useState<number>(new Date().getHours())
    const [minute, setMinute] = useState<number>(new Date().getMinutes())

    const [isDescriptionModalOpen, setDescriptionModalOpen] = useState<boolean>(false);
    const [isCategoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    
    const getTransitonInfo = () => transitionInfo[transitionMode == 'income' ? 0 : transitionMode == 'expense' ? 1 : 2]



    function createTransiton() {
        if(!fromAccount) return;

        let tra = TransitionModal.create({
            title, description, fromAccountId: fromAccount.id, mode: transitionMode, amount, 
            createOn: {year, month, date, hour, minute}, 
            toAccountId: transitionMode === 'transfer' ? toAccount.id : '', category
        });

        if(!tra) return;

        setTotalBalance(AccountModal.getTotalBalance());
        setAccounts(AccountModal.getAll());

        setNeedTransitionRefresh(pre => ++pre)
        navigator.goBack()
    }


    useEffect(() => {
        setTransitionMode(params.mode)
    }, [params])

    
    return (
        <SafePaddingView>
            <KeyboardAvoidingView  behavior='padding' style={[styles.root, {backgroundColor}]}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.topNav}>
                        <AnimateButton style={styles.topNav_closeBtn} onPress={() => navigator.goBack()}>
                            <FeatherIcons name="plus" size={20} color={color} style={{transform: 'rotate(45deg)'}} />
                        </AnimateButton>

                        <View style={[styles.center, {flexDirection: 'row', gap: 6}]}>
                            {
                                transitionInfo.map(({backgroundColor, iconName, mode}) => (
                                    (params.account && mode != 'transfer') ? (
                                        <AnimateButton 
                                            key={mode}
                                            style={{
                                                ...styles.topNav_modeSelector, 
                                                backgroundColor: mode == transitionMode ?  backgroundColor : 'transparent',
                                                borderWidth: mode == transitionMode ? 0 : 2
                                            }} 
                                            onPress={() => setTransitionMode(mode)}
                                        >
                                                <FeatherIcons
                                                    color={mode == transitionMode ? 'white' : color} 
                                                    size={20}
                                                    name={iconName} 
                                                />
                                            </AnimateButton>
                                    ) : null
                                ))
                            }
                        </View>
                    </View>

                    <View style={{marginBlock: 20}}>
                        <TextInput 
                            value={title}
                            style={[styles.titleInput, {color, opacity: title ? 1 : 0.5}]} 
                            placeholder={`${transitionMode[0].toLocaleUpperCase() + transitionMode.slice(1)} title`} 
                            onChangeText={setTitle}
                            placeholderTextColor={color}
                        />
                    </View>

                    <AnimateButton 
                        style={{...style.flex, ...style.flexRow, ...style.itemCenter, borderWidth: 2, borderColor: secondaryBackgroundColor, borderRadius: 100, paddingInline: 20, height: 44, alignSelf: 'flex-start', gap: 4, marginBlock: 10}}
                        onPress={() => setCategoryModalOpen(true)}
                    >
                        {category || <FeatherIcons name="plus" size={16} style={{fontWeight: 900, color}} />}
                        <TextTheme style={{fontWeight: 900, fontSize: 16}}>{category || 'Add Category'}</TextTheme>
                    </AnimateButton>

                    <View style={[styles.center, {gap: 10}]}>
                        <AnimateButton 
                            style={{display: 'flex', padding: 20, borderRadius: 20, backgroundColor: secondaryBackgroundColor, width: '100%', justifyContent: 'center'}} 
                            onPress={() => setDescriptionModalOpen(true)}
                        >
                            <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 14}}>
                                <FeatherIcons name="align-left" size={20} color={color} />
                                <TextTheme style={{fontWeight: '900'}}>Add description</TextTheme>
                            </View>
                            {description && <TextTheme style={{fontSize: 12, opacity: 0.8}} numberOfLines={8}>{description}</TextTheme>}
                        </AnimateButton>

                        <AnimateButton 
                            style={{...styles.box, justifyContent: 'space-between', backgroundColor: secondaryBackgroundColor}}
                        >
                            <View style={[styles.center, {gap: 14, flexDirection: 'row'}]}>
                                <FeatherIcons name="calendar" size={20} color={color} />
                                <TextTheme style={{fontWeight: '900', opacity: 0.4}}>Created on</TextTheme>
                            </View>
                            <TextTheme style={{color: 'white', fontWeight: '900'}}>
                                {mouths[month]} {hour%12 || 12}:{minute < 10 ? `0${minute}` : minute} {hour >= 12 ? 'PM' : 'AM'}
                            </TextTheme>
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
                        <AnimateButton style={styles.closeBtn}  onPress={() => navigator.goBack()}>
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
                <Text style={{color, fontSize: 16, fontWeight: '900', paddingLeft: 8}}>Add Description</Text>
                <TextInput 
                    value={description}
                    style={{fontSize: 14, color, maxHeight: 280, opacity: description ? 0.8 : 0.5}} 
                    multiline={true}
                    placeholder="Add description ..." 
                    onChangeText={setDescription}
                    placeholderTextColor={color}
                />
            </BottomModal>

            <CategorySelectorModal 
                visible={isCategoryModalOpen} 
                setVisible={setCategoryModalOpen} 
                selected={category}
                setSelected={setCategory}
            />
        </SafePaddingView>
    )
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

    const {params} = useRoute<RouteProp<RootNavigationParamsList, 'transition-screen'>>();

    const {primaryBackgroundColor: backgroundColor} = useTheme();
    const {currency} = useAppContext()

    const [isOpenCal, setOpenCal] = useState<boolean>(true);

    return (
        <View style={{display: 'flex', width: '100%', alignItems: 'flex-start'}} >

            {params.account ? (
                <View style={{alignItems: 'center', flexDirection: 'row', paddingInline: 20, height: 40, borderRadius: 100, backgroundColor: params.account.backgroundColor, borderWidth: 2, borderColor: 'gray', marginLeft: 20}} >
                    <Text style={{color: 'white', fontWeight: 800, fontSize: 14}} >{params.account.name}</Text>
                </View>
            ) :<AccountSelector accounts={accounts} useAccount={fromAccount} setUseAccount={setFromAccount} title={heading}/>}

            {!params.account && mode == 'transfer' && <AccountSelector accounts={accounts} useAccount={toAccount} setUseAccount={setToAccount} title="To" />}

            <Pressable style={[styles.center, {width: '100%', alignSelf: 'center', marginBottom: 20}]} onPress={() => setOpenCal(true)}>
                <TextTheme style={{fontWeight: 800, fontSize: 14, opacity: 0.6}}>Enter Amount</TextTheme>
                <TextTheme style={{fontWeight: '900', fontSize: 28}}>
                    <Text>{amount || '0.00'}</Text>
                    <Text> {currency}</Text>
                </TextTheme>
            </Pressable>

            <BottomModal 
                visible={isOpenCal} 
                setVisible={setOpenCal}
                backdropColor="rgba(0,0,0,.6)" 
                style={{backgroundColor, paddingInline: 20}}
                actionButtons={[
                    {
                        title: 'Set', 
                        backgroundColor: "rgb(25,200,150)",
                        onPress: () => setOpenCal(false), 
                    }
                ]}
            >
                <AccountSelector accounts={accounts} useAccount={fromAccount} setUseAccount={setFromAccount} title={heading} />

                <Calculator onResult={setAmount} value={amount} />
            </BottomModal>
        </View>
    )
}

const styles = StyleSheet.create({
    
    root:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
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
        borderWidth: 2,
        borderColor: 'gray'
    },

    topNav_modeSelector: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 44,
        aspectRatio: 1,
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

