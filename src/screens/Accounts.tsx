import { ScrollView, StyleSheet, View } from "react-native";
import TypingText from "../components/TypingText";
import AccountModal from "../Database/Models/AccountModal";
import AccountCard from "../components/AccountCard";


export default function Accounts({}): React.JSX.Element {

    const accounts = AccountModal.getAllId();

    return (
        <View style={styles.root}>
            <TypingText text="Accounts" style={styles.topHeading} />
            <TypingText text="Total: INR 123.93" style={styles.topHeading_balance} />
            
            <ScrollView style={{width: '100%', height: '100%', paddingBlock: 20}}>
                {
                    accounts.map((id: string) => (
                        <AccountCard key={id} id={id} />
                    ))
                }
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
        paddingInline: 20,
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
        alignSelf: 'flex-start'
    },

    topHeading_balance: {
        color: 'white',
        fontSize: 14,
        fontWeight: 900,
        opacity: 0.70,
        alignSelf: 'flex-start'
    }
})