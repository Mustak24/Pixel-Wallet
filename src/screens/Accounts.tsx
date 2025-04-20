import { ScrollView, StyleSheet, Text, View } from "react-native";
import TypingText from "../components/TypingText";
import AccountModal from "../Database/Models/AccountModal";
import AccountCard from "../components/AccountCard";
import { useContext } from "react";
import { AppContext } from "../Contexts/App";


export default function Accounts(): React.JSX.Element {

    const {accounts, totalBalance} = useContext(AppContext);

    return (
        <View style={styles.root}>
            <TypingText text="Accounts" style={styles.topHeading} />
            <Text style={styles.topHeading_balance}>{`Total: INR ${totalBalance || '0.00'}`}</Text>
            
            <ScrollView style={{width: '100%', height: '100%', paddingBlock: 20, paddingInline: 20}}>
                {
                    accounts?.map((acc: AccountModal) => (
                        <View key={acc.id} style={{marginBottom: 10}}>
                            <AccountCard 
                                id={acc.id} 
                                name={acc.name} 
                                balance={acc.balance} 
                                backgroundColor={acc.backgroundColor} 
                                incomeThisMonth={acc.getIncomeThisMonth() ?? 0} 
                                expensesThisMonth={acc.getExpensesThisMonth() ?? 0}  
                            />
                        </View>
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
        backgroundColor: 'black'
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
        color: 'white',
        fontSize: 14,
        fontWeight: 900,
        opacity: 0.70,
        alignSelf: 'flex-start',
        paddingInline: 20
    }
})