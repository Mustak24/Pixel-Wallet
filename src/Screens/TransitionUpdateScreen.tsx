import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import AnimateButton from "../Components/Buttons/AnimateButton";
import FeatherIcons from 'react-native-vector-icons/Feather';
import { useState } from "react";
import BottomModal from "../Components/Modal/BottomModal";
import { useAppContext } from "../Contexts/AppContext";
import { TextTheme, useTheme } from "../Contexts/ThemeProvider";
import { RootNavigationParamsList } from "../Navigation/RootNavigation";
import AccountModal from "../Database/Models/AccountModal";
import TransitionModal from "../Database/Models/TransitionModal";
import navigator from "../Navigation/NavigationService";
import SafePaddingView from "../Components/SafeAreaView/SafePaddingView";
import style from "../../AppStyle";
import { RouteProp, useRoute } from "@react-navigation/native";
import CategorySelectorModal from "../Components/Modal/CategorySelectorModal";
import AccountSelector from "../Components/AccountSelector";
import Calculator from "../Components/Other/Calculator";


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

export default function UpdateTransition(): React.JSX.Element {

    const {accounts, setAccounts, setTotalBalance, setNeedTransitionRefresh} = useAppContext();
    const {primaryColor: color, primaryBackgroundColor: backgroundColor, secondaryBackgroundColor} = useTheme();

    const route = useRoute<RouteProp<RootNavigationParamsList, 'transition-update-screen'>>();
    const {transition} = route.params;

    const [amount, setAmount] = useState<number>(transition.amount)
    const [transitionMode, setTransitionMode] = useState<transitionMode>(transition.mode);
    const [fromAccount, setFromAccount] = useState<AccountModal>(AccountModal.findById(transition.fromAccountId) ?? accounts[0]);
    const [toAccount, setToAccount] = useState<AccountModal>(AccountModal.findById(transition.toAccountId) ?? accounts[0]);
    const [title, setTitle] = useState<string>(transition.title);
    const [category, setCategory] = useState<string>(transition.category);
    const [description, setDescription] = useState<string>(transition.description);
    const [year, setYear] = useState<number>(transition.createOn.year)
    const [month, setMonth] = useState<number>(transition.createOn.month)
    const [date, setDate] = useState<number>(transition.createOn.date)
    const [hour, setHour] = useState<number>(transition.createOn.hour)
    const [minute, setMinute] = useState<number>(transition.createOn.minute)

    const [isDescriptionModalOpen, setDescriptionModalOpen] = useState<boolean>(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isCategoryModalOpen, setCategoryModalOpen] = useState<boolean>(false)
    
    const getTransitonInfo = () => transitionInfo[transitionMode == 'income' ? 0 : transitionMode == 'expense' ? 1 : 2]



    function updateTransition() {
        TransitionModal.deleteById(transition.id);
        TransitionModal.create({
            mode: transitionMode, 
            fromAccountId: fromAccount.id, 
            toAccountId: transitionMode == 'transfer' ? toAccount.id : '',
            amount, 
            title, description, 
            createOn : {
                year, month, date, minute, hour
            }, category
        })

        setAccounts(AccountModal.getAll());
        setTotalBalance(AccountModal.getTotalBalance());

        setNeedTransitionRefresh(pre => ++pre)
        navigator.goBack()
    }
    
    function deleteTransition() {
        TransitionModal.deleteById(transition.id);
        
        setAccounts(AccountModal.getAll());
        setTotalBalance(AccountModal.getTotalBalance());
        
        setNeedTransitionRefresh(pre => ++pre)
        navigator.goBack();
    }


    return (
    <SafePaddingView style={styles.root} >
        <KeyboardAvoidingView  behavior='padding'  style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.topNav}>
                    <AnimateButton style={styles.topNav_closeBtn} onPress={() => navigator.goBack()}>
                        <FeatherIcons name="plus" size={20} color={color} style={{transform: 'rotate(45deg)'}} />
                    </AnimateButton>

                    <View style={[styles.center, {flexDirection: 'row', gap: 6}]}>
                        {
                            transitionInfo.map(({backgroundColor, iconName, mode}) => (
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
                                )
                            )
                        }

                    </View>

                    <AnimateButton onPress={() => setDeleteModalVisible(true)} style={{...styles.topNav_modeSelector, backgroundColor: 'rgb(250,50,50)'}}>
                        <FeatherIcons name="trash-2" size={20} color={'white'} />
                    </AnimateButton>
                </View>

                <View style={{marginBlock: 20}}>
                    <TextInput 
                        value={title}
                        style={[styles.titleInput, {color, opacity: title ? 1 : 0.5}]} 
                        placeholder={`${transitionMode[0].toLocaleUpperCase() + transitionMode.slice(1)} title`} 
                        placeholderTextColor={color}
                        onChangeText={setTitle}
                    />
                </View>

                <AnimateButton 
                    style={{...style.flex, ...style.flexRow, ...style.itemCenter, borderWidth: 2, borderColor: secondaryBackgroundColor, borderRadius: 100, paddingInline: 20, height: 44, alignSelf: 'flex-start', gap: 4, marginBlock: 10}}
                    onPress={() => setCategoryModalOpen(true)}
                >
                    {category ? null : <FeatherIcons name="plus" size={16} style={{fontWeight: 900, color}} />}
                    <TextTheme style={{fontWeight: 900, fontSize: 16}}>{category || 'Add Category'}</TextTheme>
                </AnimateButton>

                <View style={[styles.center, {gap: 10}]}>
                    <AnimateButton style={{display: 'flex', padding: 20, borderRadius: 20, backgroundColor: secondaryBackgroundColor, width: '100%', justifyContent: 'center'}} onPress={() => setDescriptionModalOpen(true)}>
                        <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 14}}>
                            <FeatherIcons name="align-left" size={20} color={color} />
                            <TextTheme style={{fontWeight: '900'}}>Add description</TextTheme>
                        </View>
                        {description && <TextTheme style={{fontSize: 12, opacity: 0.8}} numberOfLines={8}>{description}</TextTheme>}
                    </AnimateButton>

                    <AnimateButton style={{...styles.box, justifyContent: 'space-between', backgroundColor: secondaryBackgroundColor}}>
                        <View style={[styles.center, {gap: 14, flexDirection: 'row'}]}>
                            <FeatherIcons name="calendar" size={20} color={color} />
                            <TextTheme style={{fontWeight: '900', opacity: 0.4}}>Created on</TextTheme>
                        </View>
                        <TextTheme style={{fontWeight: '900'}}>
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
                        <AnimateButton style={{...styles.actionBtn, backgroundColor: 'rgb(25,200,150)'}} onPress={updateTransition}>
                            <Text style={{fontWeight: '900', color: 'white'}}>Save</Text>
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
            <TextTheme style={{fontSize: 16, fontWeight: '900', paddingLeft: 8}}>Add Description</TextTheme>
            <TextInput 
                value={description}
                style={{fontSize: 14, color, maxHeight: 280, opacity: 0.8}} 
                multiline={true}
                placeholder="Add description ..." 
                onChangeText={setDescription}
            />
        </BottomModal>

        <BottomModal 
            visible={isDeleteModalVisible} 
            setVisible={setDeleteModalVisible} 
            style={{paddingInline: 20, paddingBottom: 80}}
            actionButtons={[
                {
                    title: 'Delete', 
                    icon: <FeatherIcons name="trash-2" size={20} color={'white'} />, 
                    onPress: () => deleteTransition(),
                    backgroundColor: 'rgb(250,50,50)'
                }
            ]} 
        >
            <Text style={{color: 'rgb(250,60,60)', fontWeight: '900', fontSize: 24, marginBottom: 10}}>Alert !!!</Text>
            <Text style={{color: 'rgb(250,60,60)', fontWeight: '900', fontSize: 14}}>Once you delete a Transition, there is no going back.</Text>
        </BottomModal>

        <CategorySelectorModal
            visible={isCategoryModalOpen} 
            setVisible={setCategoryModalOpen} 
            selected={category}
            setSelected={setCategory}
        />

    </SafePaddingView>)
}


type AmountBoxtransition = {
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

function AmountBox({heading, accounts, setFromAccount, amount, setAmount, mode, setToAccount, fromAccount, toAccount}: AmountBoxtransition){

    const {primaryBackgroundColor: backgroundColor} = useTheme();
    const {currency} = useAppContext()

    const [isOpenCal, setOpenCal] = useState<boolean>(false);

    return (
        <View style={{display: 'flex', width: '100%', alignItems: 'flex-start'}} >

            <AccountSelector accounts={accounts} useAccount={fromAccount} setUseAccount={setFromAccount} title={heading}/>

            {mode == 'transfer' && <AccountSelector accounts={accounts} useAccount={toAccount} setUseAccount={setToAccount} title="To" />}

            <Pressable style={[styles.center, {width: '100%', alignSelf: 'center', marginBottom: 20}]} onPress={() => setOpenCal(true)}>
                <TextTheme style={{fontWeight: 800, fontSize: 14, opacity: 0.6}}>Enter Amount</TextTheme>
                <TextTheme style={{fontWeight: '900', fontSize: 28, color: 'white'}}>
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
                <AccountSelector accounts={accounts} useAccount={fromAccount} setUseAccount={setFromAccount} title={heading}/>

                <Calculator onResult={setAmount} value={amount}/>
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
        height: '100%',
        paddingTop: 10,
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

