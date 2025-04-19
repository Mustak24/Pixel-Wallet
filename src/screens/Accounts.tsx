import { ScrollView, StyleSheet, View } from "react-native";
import TypingText from "../components/TypingText";
import AccountModal from "../Database/Models/AccountModal";
import AccountCard from "../components/AccountCard";
import { useEffect, useState } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { stackParamsList } from "../../App";


export default function Accounts({ navigation }: BottomTabScreenProps<stackParamsList, 'accounts'>): React.JSX.Element {

    const [accountsId, setAccountsId] = useState(AccountModal.getAllId());

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setAccountsId(AccountModal.getAllId());
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.root}>
            <TypingText text="Accounts" style={styles.topHeading} />
            <TypingText text="Total: INR 123.93" style={styles.topHeading_balance} />
            
            <ScrollView style={{width: '100%', height: '100%', paddingBlock: 20}}>
                {
                    accountsId.map((id: string) => (
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