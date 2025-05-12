import style from '../../../../AppStyle';
import { Pressable, ScrollView, Text, TouchableHighlight, View } from "react-native";
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextTheme from '../../../components/Text/TextTheme';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../Contexts/AppContext';
import TransitionModal from '../../../Database/Models/TransitionModal';
import AccountModal from '../../../Database/Models/AccountModal';
import DateSelectorModal from '../../../components/Modal/DateSelectorModal';
import TransitionCard from '../../../components/Cards/TransitionCard';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { AccountStackParamsList } from '../../../Navigation/StackNavigation/AccountsStackNavigator';
import AnimateButton from '../../../components/Buttons/AnimateButton';
import UpdateAccountInfoModal from './UpdateAccountInfoModal';
import DeleteAccountModal from './DeleteAccountModal';
import HaveNoTransition from '../../../components/HaveNoTransition';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../Contexts/ThemeProvider';


type accountInfoCardType = {
    type: 'Income' | 'Expense',
    mode: 'income' | 'expense',
    amount: number | string,
    transitions: number
}

export default function AccountInfo({route, navigation}: StackScreenProps<AccountStackParamsList, 'account-info'>): React.JSX.Element {
    const {primaryBackgroundColor: backgroundColor} = useContext(ThemeContext);

    const {account: acc} = route.params;
    const transitionsRecord: {income: TransitionModal[], expense: TransitionModal[]} = acc.getTransitionsRecord();
  
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isUpdateModalVisible, setUpdateModalVisible] = useState<boolean>(false);

    const [account, setAccount] = useState(acc);
    const [transitions, setTransitions] = useState<TransitionModal[]>([])
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    
    
    const accountInfo: accountInfoCardType[] =  [
        {type: 'Income', amount: account.getIncomeThisMonth() || '0.00', transitions: transitionsRecord?.income.length ?? 0, mode: 'income'},
        {type: 'Expense', amount: account.getExpenseThisMonth() || '0.00', transitions: transitionsRecord?.expense.length ?? 0, mode: 'expense'}
    ]

    useEffect(() => {
        let unsubscribe = navigation.addListener('focus', () => {
            setAccount(AccountModal.findById(acc.id) ?? acc);
            setTransitions(TransitionModal.findByDate(month, year).filter(tra => tra.fromAccountId == account.id || tra.toAccountId == account.id))
        });
        return unsubscribe
    }, [])

    return (
        <>
            <ScrollView style={{width: '100%', height: '100%', backgroundColor: account.backgroundColor, paddingTop: 44}}>
                <View style={[style.flex, style.itemCenter, style.justifyBetween, style.flexRow, {paddingInline: 20, paddingBottom: 14}]}>
                    <Pressable 
                        onPress={() => navigation.goBack()} 
                        style={[style.center, {borderWidth: 2, borderColor: 'white', width: 44, aspectRatio: 1, borderRadius: 100}]}
                    >
                        <FeatherIcons name="plus" size={20} color={'white'} style={{transform: 'rotate(45deg)'}} />
                    </Pressable>

                    <View style={[style.flex, style.itemCenter, style.justifyCenter, style.flexRow, {gap: 10}]}>
                        <Pressable 
                            onPress={() => setUpdateModalVisible(true)}
                            style={[style.center, style.flexRow, {borderRadius: 100, height: 44, paddingInline: 20, borderWidth: 2, borderColor: 'white', gap: 10}]}
                        >
                            <FeatherIcons name="edit-3" size={20} color={'white'} />
                            <Text style={{fontSize: 14, fontWeight: '900', color: 'white'}}>Edit</Text>
                        </Pressable>

                        <Pressable 
                            onPress={() => setDeleteModalVisible(true)}
                            style={[style.center, {width: 44, aspectRatio: 1, borderRadius: 100, backgroundColor: 'crimson', opacity: 0.9}]}
                        >
                            <MaterialIcons name="delete-outline" size={22} color={'white'} />
                        </Pressable>
                    </View>
                </View>

                <View style={[style.flex, style.itemStart, {padding: 20, width: '100%'}]}>
                    <View style={[style.center, style.flexRow, {gap: 10}]}>
                        <FeatherIcons name='credit-card' size={24} color={'white'} style={{fontWeight: 900}} />
                        <Text style={{fontWeight: 900, fontSize: 18, color: 'white'}}>{account.name}</Text>
                    </View>

                    <Text style={{fontSize: 24, fontWeight: 900, marginBlock: 20, color: 'white'}}>
                        <Text>INR </Text>
                        <Text style={{fontWeight: 900, fontSize: 24}}>{account.balance || '0.00'}</Text>
                    </Text>

                    <View style={[style.center, style.flexRow, {gap: 10, width: '100%'}]}>
                        {
                            accountInfo.map(({type, amount, transitions, mode}) => (
                                <AnimateButton key={type} style={{backgroundColor: 'rgba(0,0,0,.8)', borderRadius: 20, paddingTop: 20, flex: 1, padding: 10}}>
                                    <Text style={{fontWeight: 900, marginBottom: 10, paddingLeft: 10, color: 'white'}}>{type?.toLocaleUpperCase()}</Text>

                                    <Text style={{fontSize: 18, fontWeight: 900, marginBottom: 16, paddingLeft: 10, color: 'white'}}>
                                        <Text>INR </Text>
                                        <Text>{amount}</Text>
                                    </Text>

                                    
                                    <View style={[style.flex, style.flexRow, {gap: 10, paddingLeft: 10}]}>
                                        <FeatherIcons name='trending-up' size={24} color={'white'} style={{fontWeight: 900}} />
                                        <Text style={{fontWeight: 900, fontSize: 18, color: 'white'}}>{transitions}</Text>
                                    </View>
                                    <Text style={{fontSize: 12, color: 'gray', fontWeight: 900, opacity: 0.9, paddingLeft: 10, paddingBottom: 10}}>Transitions</Text>

                                    <Pressable 
                                        onPress={() => {navigation.push('create-transition', {account, mode})}} 
                                        style={[style.center, {height: 44, borderRadius: 10, backgroundColor: 'rgb(25,200,150)', width: '100%'}]}
                                    >
                                        <Text style={{color: 'white'}}>
                                            Add {type}
                                        </Text>
                                    </Pressable>
                                </AnimateButton>
                            ))
                        }
                    </View>
                </View>

                <View 
                    style={{paddingInline: 20, paddingTop: 26, backgroundColor, borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: 34, paddingBottom: 100, height: '100%'}}
                >
                        <TransitionsRecords 
                            account={account} 
                            month={month} setMonth={setMonth} 
                            year={year} setYear={setYear} 
                            transitions={transitions} setTransitions={setTransitions} 
                        />
                </View>
            </ScrollView>

            <UpdateAccountInfoModal 
                year={year}
                month={month} 
                account={account} 
                setTransitions={setTransitions}
                visible={isUpdateModalVisible} setVisible={setUpdateModalVisible} 
            />

            <DeleteAccountModal visible={isDeleteModalVisible} setVisible={setDeleteModalVisible} account={account} />
        </>
    )
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

type TransitionsRecordsType = {
    account: AccountModal, 
    month: number, setMonth: Dispatch<SetStateAction<number>>,
    year: number, setYear: Dispatch<SetStateAction<number>>,
    transitions: TransitionModal[], setTransitions: Dispatch<SetStateAction<TransitionModal[]>>
}

function TransitionsRecords({account, month, setMonth, year, setYear, transitions, setTransitions}: TransitionsRecordsType): React.JSX.Element {
    const {primaryColor: color} = useContext(ThemeContext);

    const [isDateModalVisible, setDateModalVisible] = useState<boolean>(false)
    const navigation = useNavigation<StackNavigationProp<AccountStackParamsList, 'account-info'>>();

    useEffect(() => {
        setTransitions(TransitionModal.findByDate(month, year).filter(tra => tra.fromAccountId == account.id || tra.toAccountId == account.id));
    }, [month, year]);

    return (
        <View>
            <View style={[style.center, style.flexRow, style.justifyBetween, {paddingInline: 20, height: 44, borderWidth: 2, borderColor: color, borderRadius: 100}]}>
                <TouchableHighlight 
                    onPress={() => {
                        if(month == 0) {
                            setYear(year => year - 1);
                            setMonth(() => 11);
                        } else {
                            setMonth(month => month - 1);
                        }
                    }}
                >
                    <FeatherIcons name='chevron-left' size={20} color={color}/>
                </TouchableHighlight>
                
                <TouchableHighlight onPress={() => setDateModalVisible(true)}>
                    <TextTheme style={{fontWeight: '900', fontSize: 14}}>{months[month]}, {year}</TextTheme>
                </TouchableHighlight>
                
                <TouchableHighlight
                    onPress={() => {
                        if(month == 11) {
                            setYear(year => year + 1);
                            setMonth(() => 0);
                        } else {
                            setMonth(month => month + 1);
                        }
                    }}
                >
                    <FeatherIcons name='chevron-right' size={20} color={color}/>
                </TouchableHighlight>
            </View>

            <View>
                {transitions.length == 0 ? <HaveNoTransition/> : null}

                {
                   transitions.map( (transition) => (
                        <TransitionCard 
                            key={transition.id} 
                            id={transition.id} 
                            mode={transition.mode} 
                            fromAccountId={transition.fromAccountId} 
                            toAccountId={transition.toAccountId}
                            amount={transition.amount} 
                            title={transition.title} 
                            description={transition.description} 
                            createOn={transition.createOn} 
                            onPress={() => {navigation.push('update-transition', {transition})}}
                        />
                    ))
                }
            </View>

            <DateSelectorModal visible={isDateModalVisible} setVisible={setDateModalVisible} month={month} setMonth={setMonth} year={year} setYear={setYear} />
        </View>
    )
}