import style from '../../../../AppStyle';
import { Pressable, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TransactionModal from '../../../Database/Models/TransactionModal';
import AccountModal from '../../../Database/Models/AccountModal';
import MonthSelectorModal from '../../../Components/Modal/MonthSelectorModal';
import TransactionCard from '../../../Components/Cards/TransactionCard';
import HaveNoTransaction from '../../../Components/Other/HaveNoTransaction';
import { TextTheme, useTheme } from '../../../Contexts/ThemeProvider';
import navigator from '../../../Navigation/NavigationService';
import SafePaddingView from '../../../Components/SafeAreaView/SafePaddingView';
import AnimateButton from '../../../Components/Buttons/AnimateButton';
import { useAppContext } from '../../../Contexts/AppContext';
import BottomModal from '../../../Components/Modal/BottomModal';
import Calculator from '../../../Components/Other/Calculator';
import DeleteModal from '../../../Components/Modal/DeleteModal';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootNavigationParamsList } from '../../../Navigation/RootNavigation';


type accountInfoCardType = {
    type: 'Income' | 'Expense',
    mode: 'income' | 'expense',
    amount: number | string,
    transactions: number
}

export default function AccountInfo(): React.JSX.Element {

    const {primaryBackgroundColor: backgroundColor} = useTheme();
    const {isNeedTransactionRefresh, setAccounts, currency} = useAppContext()

    const route = useRoute<RouteProp<RootNavigationParamsList, 'account-info-screen'>>()

    const {account: acc} = route.params;
    const transitionsRecord: {income: TransactionModal[], expense: TransactionModal[]} = acc.getTransactionsRecord();
  
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isUpdateModalVisible, setUpdateModalVisible] = useState<boolean>(false);

    const [account, setAccount] = useState(acc);
    const [transactions, setTransactions] = useState<TransactionModal[]>([])
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    
    
    const accountInfo: accountInfoCardType[] =  [
        {type: 'Income', amount: account.getIncomeThisMonth() || '0.00', transactions: transitionsRecord?.income.length ?? 0, mode: 'income'},
        {type: 'Expense', amount: account.getExpenseThisMonth() || '0.00', transactions: transitionsRecord?.expense.length ?? 0, mode: 'expense'}
    ]

    useEffect(() => {
        setAccount(AccountModal.findById(acc.id) ?? acc);
        setTransactions(TransactionModal.findByDate(month, year).filter(tra => tra.fromAccountId == account.id || tra.toAccountId == account.id))
    }, [isNeedTransactionRefresh])

    return (
        <SafePaddingView fromBottom={false} style={{width: '100%', height: '100%'}} backgroundColor={account.backgroundColor} >
            <ScrollView style={{width: '100%', height: '100%',  marginTop: 10,}} >
                <View style={[style.flex, style.itemCenter, style.justifyBetween, style.flexRow, {paddingInline: 20, paddingBottom: 14}]}>
                    <Pressable 
                        onPress={() => navigator.goBack()} 
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
                        <Text>{currency} </Text>
                        <Text style={{fontWeight: 900, fontSize: 24}}>{account.balance || '0.00'}</Text>
                    </Text>

                    <View style={[style.center, style.flexRow, {gap: 10, width: '100%'}]}>
                        {
                            accountInfo.map(({type, amount, transactions, mode}) => (
                                <AnimateButton key={type} style={{backgroundColor: 'rgba(0,0,0,.8)', borderRadius: 20, paddingTop: 20, flex: 1, padding: 10}}>
                                    <Text style={{fontWeight: 900, marginBottom: 10, paddingLeft: 10, color: 'white'}}>{type?.toLocaleUpperCase()}</Text>

                                    <Text style={{fontSize: 18, fontWeight: 900, marginBottom: 16, paddingLeft: 10, color: 'white'}}>
                                        <Text>{currency} </Text>
                                        <Text>{amount}</Text>
                                    </Text>

                                    
                                    <View style={[style.flex, style.flexRow, {gap: 10, paddingLeft: 10}]}>
                                        <FeatherIcons name='trending-up' size={24} color={'white'} style={{fontWeight: 900}} />
                                        <Text style={{fontWeight: 900, fontSize: 18, color: 'white'}}>{transactions}</Text>
                                    </View>
                                    <Text style={{fontSize: 12, color: 'gray', fontWeight: 900, opacity: 0.9, paddingLeft: 10, paddingBottom: 10}}>Transactions</Text>

                                    <Pressable 
                                        onPress={() => {navigator.navigate('transaction-screen', {account, mode})}} 
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
                        <TransactionsRecords 
                            account={account} 
                            month={month} setMonth={setMonth} 
                            year={year} setYear={setYear} 
                            transactions={transactions} setTransactions={setTransactions} 
                        />
                </View>
            </ScrollView>

            <UpdateAccountInfoModal
                year={year}
                month={month} 
                account={account} 
                setTransactions={setTransactions}
                visible={isUpdateModalVisible} setVisible={setUpdateModalVisible} 
            />

            <DeleteModal visible={isDeleteModalVisible} setVisible={setDeleteModalVisible} passkey={account.name} massage='' handleDelete={() => {
                AccountModal.deleteById(account.id);
                setAccounts(AccountModal.getAll())
                setDeleteModalVisible(false);
                navigator.goBack();
            }} />
        </SafePaddingView>
    )
}




const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

type TransactionsRecordsType = {
    account: AccountModal, 
    month: number, setMonth: Dispatch<SetStateAction<number>>,
    year: number, setYear: Dispatch<SetStateAction<number>>,
    transactions: TransactionModal[], setTransactions: Dispatch<SetStateAction<TransactionModal[]>>
}

function TransactionsRecords({account, month, setMonth, year, setYear, transactions, setTransactions}: TransactionsRecordsType): React.JSX.Element {

    const {primaryColor: color} = useTheme();
    const {isNeedTransactionRefresh} = useAppContext()

    const [isDateModalVisible, setDateModalVisible] = useState<boolean>(false)

    useEffect(() => {
        setTransactions(TransactionModal.findByDate(month, year).filter(tra => tra.fromAccountId == account.id || tra.toAccountId == account.id));
    }, [month, year, isNeedTransactionRefresh]);

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
                {transactions.length == 0 ? <HaveNoTransaction/> : null}

                {
                   transactions.map( (transaction) => (
                        <TransactionCard 
                            key={transaction.id} 
                            id={transaction.id} 
                            mode={transaction.mode} 
                            fromAccountId={transaction.fromAccountId} 
                            toAccountId={transaction.toAccountId}
                            amount={transaction.amount} 
                            title={transaction.title} 
                            description={transaction.description} 
                            createOn={transaction.createOn} 
                            category={transaction.category}
                            onPress={() => {navigator.navigate('transaction-update-screen', {transaction})}}
                        />
                    ))
                }
            </View>

            <MonthSelectorModal visible={isDateModalVisible} setVisible={setDateModalVisible} month={month} setMonth={setMonth} year={year} setYear={setYear} />
        </View>
    )
}




const colors = ['rgb(170,50,50)', 'rgb(170,100,50)', 'rgb(170,140,50)', 'rgb(170,170,50)', 'rgb(50,170,100)', 'rgb(25,200,150)', 'rgb(50,150,120)', 'rgb(50,170,170)','rgb(50,130,170)', 'rgb(50,100,170)','rgb(100,50,170)', 'rgb(120,50,170)', 'rgb(170,50,150)', 'rgb(170,50,100)']


type UpdateAccountInfoModalProps = {
    visible: boolean, setVisible: Dispatch<SetStateAction<boolean>>,
    setTransactions: Dispatch<SetStateAction<TransactionModal[]>>,
    account: AccountModal,
    month: number,
    year: number 
}

function UpdateAccountInfoModal({visible, setVisible, account, setTransactions, month, year}: UpdateAccountInfoModalProps): React.JSX.Element {

    const {setAccounts, setTotalBalance, currency} = useAppContext();
    const {primaryColor: color} = useTheme();

    const [name, setName] = useState<string>(account.name);
    const [balance, setBalance] = useState<number>(account.balance);
    const [backgroundColor, setBackgroundColor] = useState<string>(account.backgroundColor);

    const [isCalOpen, setCalOpen] = useState(false);

    function update() {
        if(!name) return;

        if(account.balance != balance) {
            let tra = TransactionModal.create({
                mode: account.balance < balance ? 'income' : 'expense', 
                title: 'Adjust Balance', 
                description: '',    
                category: '',
                amount: Math.abs(balance - account.balance), 
                fromAccountId: account.id, 
                toAccountId: '', 
                createOn:{
                    year: new Date().getFullYear(),
                    month: new Date().getMonth(),
                    date: new Date().getDate(),
                    hour: new Date().getHours(),
                    minute: new Date().getMinutes()
                }
            });

            if(!tra) return;
        }
        
        account.name = name;
        account.backgroundColor = backgroundColor;
        account.balance = balance;
        account.save();

        setName('');
        setBalance(0);
        setVisible(false);

        setAccounts(AccountModal.getAll());
        setTotalBalance(AccountModal.getTotalBalance());
        setTransactions(TransactionModal.findByDate(month, year).filter(tra => tra.fromAccountId == account.id))
    }

    return (
        <BottomModal backdropColor="rgba(0,0,0,.5)" visible={visible} setVisible={setVisible} actionButtons={[{title: 'Save', onPress: update, backgroundColor: 'rgb(25, 200, 150)'}]}  >
            <View style={{paddingBlock: 10}}>
                <View style={{display: 'flex', paddingInline: 20, width: '100%'}}>
                    <TextTheme style={{fontSize: 18, fontWeight: 900}}>Account Options</TextTheme>

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
                        <Text> {currency}</Text>
                    </TextTheme>
                </Pressable>

                <BottomModal visible={isCalOpen} setVisible={setCalOpen} actionButtons={[{title: 'Set', onPress: () => setCalOpen(false), backgroundColor}]} >
                    <TextTheme style={{fontSize: 14, fontWeight: 800, paddingLeft: 20, marginBottom: 20, opacity: .6}}>Enter Account Balance :</TextTheme>
                    <Calculator value={balance} onResult={setBalance} />
                </BottomModal>
            </View>
        </BottomModal>
    )
}