import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../../../Contexts/AppContext";
import { TextTheme } from "../../../Contexts/ThemeProvider";
import SafePaddingView from "../../../Components/SafeAreaView/SafePaddingView";
import TypingText from "../../../Components/Text/TypingText";
import AccountModal from "../../../Database/Models/AccountModal";
import AccountCard from "../../../Components/Cards/AccountCard";
import navigator from "../../../Navigation/NavigationService";


export default function AccountScreen(): React.JSX.Element {

    const {accounts, totalBalance, currency} = useAppContext();

    return (
        <SafePaddingView style={styles.root}>
            <TypingText text="Accounts" style={styles.topHeading} />
            <TextTheme style={styles.topHeading_balance}>{`Total: ${currency} ${totalBalance || '0.00'}`}</TextTheme>
            
            <ScrollView style={{width: '100%', height: '100%', paddingBlock: 20, paddingInline: 20}}>
                {
                    accounts?.map((acc: AccountModal) => (
                        <Pressable onPress={() => navigator.navigate('account-info-screen', {account: acc})} key={acc.id} style={{marginBottom: 10}}>
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
        </SafePaddingView>
    )
}


const styles = StyleSheet.create({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        flex: 1
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