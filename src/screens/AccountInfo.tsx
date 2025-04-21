import style from '../../AppStyle';

import { Pressable, ScrollView, View } from "react-native";
import { stackParamsList } from "../../App";
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextTheme from '../components/Text/TextTheme';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Contexts/App';
import TransitionModal from '../Database/Models/TransitionModal';
import AccountModal from '../Database/Models/AccountModal';
import DateSelectorModal from '../components/Modal/DateSelectorModal';
import TransitionCard from '../components/TransitionCard';
import { StackScreenProps } from '@react-navigation/stack';


export default function AccountInfo({route, navigation}: StackScreenProps<stackParamsList, 'account-info'>): React.JSX.Element {
    const {color, backgroundColor} = useContext(AppContext);

    const {account} = route.params;
    const transitionsRecord: {income: TransitionModal[], expense: TransitionModal[]} = account.getTransitionsRecord();

    return (
        <ScrollView style={{width: '100%', height: '100%', backgroundColor: account.backgroundColor, paddingTop: 44}}>
            <View style={[style.flex, style.itemCenter, style.justifyBetween, style.flexRow, {paddingInline: 20, paddingBottom: 14}]}>
                <Pressable onPress={() => navigation.goBack()} style={[style.center, {borderWidth: 2, borderColor: color, width: 44, aspectRatio: 1, borderRadius: 100}]}>
                    <FeatherIcons name="plus" size={20} color={color} style={{transform: 'rotate(45deg)'}} />
                </Pressable>

                <View style={[style.flex, style.itemCenter, style.justifyCenter, style.flexRow, {gap: 10}]}>
                    <Pressable style={[style.center, style.flexRow, {borderRadius: 100, height: 44, paddingInline: 20, borderWidth: 2, borderColor: color, gap: 10}]}>
                        <FeatherIcons name="edit-3" size={20} color={color} />
                        <TextTheme style={{fontSize: 14, fontWeight: '900'}}>Edit</TextTheme>
                    </Pressable>

                    <Pressable style={[style.center, {width: 44, aspectRatio: 1, borderRadius: 100, backgroundColor: 'crimson', opacity: 0.9}]}>
                        <MaterialIcons name="delete-outline" size={22} color={color} />
                    </Pressable>
                </View>
            </View>

            <View style={[style.flex, style.itemStart, {padding: 20, width: '100%'}]}>
                <View style={[style.center, style.flexRow, {gap: 10}]}>
                    <FeatherIcons name='credit-card' size={24} color={color} style={{fontWeight: 900}} />
                    <TextTheme style={{fontWeight: 900, fontSize: 18}}>{account.name}</TextTheme>
                </View>

                <TextTheme style={{fontSize: 24, fontWeight: 900, marginBlock: 20}}>
                    <TextTheme>INR </TextTheme>
                    <TextTheme style={{fontWeight: 900, fontSize: 24}}>{account.balance || '0.00'}</TextTheme>
                </TextTheme>

                <View style={[style.center, style.flexRow, {gap: 10, width: '100%'}]}>
                    {
                        [
                            {type: 'Income', amount: account.getIncomeThisMonth() || '0.00', transitions: transitionsRecord?.income.length ?? 0},
                            {type: 'Expense', amount: account.getExpensesThisMonth() || '0.00', transitions: transitionsRecord?.expense.length ?? 0}
                        ].map(({type, amount, transitions}) => (
                            <View key={type} style={{backgroundColor: 'rgba(0,0,0,.8)', borderRadius: 20, paddingTop: 20, flex: 1, padding: 10}}>
                                <TextTheme style={{fontWeight: 900, marginBottom: 10, paddingLeft: 10}}>{type?.toLocaleUpperCase()}</TextTheme>

                                <TextTheme style={{fontSize: 18, fontWeight: 900, marginBottom: 16, paddingLeft: 10}}>
                                    <TextTheme>INR </TextTheme>
                                    <TextTheme>{amount}</TextTheme>
                                </TextTheme>

                                
                                <View style={[style.flex, style.flexRow, {gap: 10, paddingLeft: 10}]}>
                                    <FeatherIcons name='trending-up' size={24} color={color} style={{fontWeight: 900}} />
                                    <TextTheme style={{fontWeight: 900, fontSize: 18}}>{transitions}</TextTheme>
                                </View>
                                <TextTheme style={{fontSize: 12, color: 'gray', fontWeight: 900, opacity: 0.9, paddingLeft: 10, paddingBottom: 10}}>Transitions</TextTheme>

                                <Pressable style={[style.center, {height: 44, borderRadius: 10, backgroundColor: 'rgb(25,200,150)', width: '100%'}]}>
                                    <TextTheme>
                                        Add {type}
                                    </TextTheme>
                                </Pressable>
                            </View>
                        ))
                    }
                </View>
            </View>

            <View style={{paddingInline: 20, paddingTop: 26, backgroundColor, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: 34, paddingBottom: 100, height: '100%'}}>
                    <TransitionsRecords account={account} />
            </View>

        </ScrollView>
    )
}


function TransitionsRecords({account}: {account: AccountModal}): React.JSX.Element {
    const {color} = useContext(AppContext);
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [transitions, setTransitions] = useState<TransitionModal[]>([]);

    const [isDateModalVisible, setDateModalVisible] = useState<boolean>(false)

    useEffect(() => {
        let transitions: TransitionModal[] = TransitionModal.findByDate(month, year).filter(tra => tra.toAccountId == account.id);
        setTransitions(() => transitions);
    }, [month, year])

    return (
        <View>
            <View style={[style.center, style.flexRow, style.justifyBetween, {paddingInline: 20, height: 44, borderWidth: 2, borderColor: color, borderRadius: 100}]}>
                <FeatherIcons name='chevron-left' size={20} color={color}/>
                <TextTheme style={{fontWeight: '900', fontSize: 14}}>{months[month]}, {year}</TextTheme>
                <FeatherIcons name='chevron-right' size={20} color={color}/>
            </View>

            <View>
                {
                    transitions.map(({id, mode, fromAccountId, amount, title, description, createOn, toAccountId}) => (
                        <TransitionCard
                            key={id} 
                            id={id} 
                            mode={mode} 
                            fromAccountId={fromAccountId} 
                            toAccountId={toAccountId}
                            amount={amount} 
                            title={title} 
                            description={description} 
                            createOn={createOn} 
                        />
                    ))
                }
            </View>

            <DateSelectorModal visible={isDateModalVisible} setVisible={setDateModalVisible} month={month} setMonth={setMonth} year={year} setYear={setYear} />
        </View>
    )
}