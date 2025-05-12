import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TypingText from "../../components/Text/TypingText";
import AccountModal from "../../Database/Models/AccountModal";
import AccountCard from "../../components/Cards/AccountCard";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import { StackScreenProps } from "@react-navigation/stack";
import { AccountStackParamsList } from "../../Navigation/StackNavigation/AccountsStackNavigator";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import TextTheme from "../../components/Text/TextTheme";


export default function Accounts({navigation}: StackScreenProps<AccountStackParamsList, 'accounts'>): React.JSX.Element {

    const {accounts, totalBalance} = useContext(AppContext);
    const {primaryBackgroundColor: backgroundColor} = useContext(ThemeContext);

    return (
        <View style={[styles.root, {backgroundColor}]}>
            <TypingText text="Accounts" style={styles.topHeading} />
            <TextTheme style={styles.topHeading_balance}>{`Total: INR ${totalBalance || '0.00'}`}</TextTheme>
            
            <ScrollView style={{width: '100%', height: '100%', paddingBlock: 20, paddingInline: 20}}>
                {
                    accounts?.map((acc: AccountModal) => (
                        <Pressable onPress={() => navigation.push('account-info', {account: acc})} key={acc.id} style={{marginBottom: 10}}>
                            <AccountCard 
                                id={acc.id} 
                                name={acc.name} 
                                balance={acc.balance} 
                                backgroundColor={acc.backgroundColor} 
                                incomeThisMonth={acc.getIncomeThisMonth() ?? 0} 
                                expenseThisMonth={acc.getExpenseThisMonth() ?? 0}  
                            />
                        </Pressable>
                    ))
                }

                <View style={{height: 100}}></View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        paddingTop: 44,
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    topHeading: {
        color: 'white',
        fontSize: 20,
        fontWeight: 900,
        alignSelf: 'flex-start',
        paddingInline: 20
    },

    topHeading_balance: {
        fontSize: 14,
        fontWeight: 900,
        opacity: 0.70,
        alignSelf: 'flex-start',
        paddingInline: 20
    }
})