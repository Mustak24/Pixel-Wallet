import { StyleSheet, Text, View } from "react-native";
import AccountModal from "../Database/Models/AccountModal";

type AccountCardProps = {
    id: string
}

export default function AccountCard({id}: AccountCardProps): React.JSX.Element{

    const account = AccountModal.findById(id);
    if(!account) return <></>;

    const {backgroundColor, name, balance} = account
    const incomeThisMounth = account.getIncomeThisMounth();
    const expensesThisMounth = account.getExpensesThisMounth();

    return (
        <View style={styles.root}>
            <View style={{display: 'flex', backgroundColor, width: "100%", padding: 20, gap: 12}}>
                <Text style={{fontSize: 18, fontWeight: 900, color: 'white'}}>{name}</Text>
                <Text style={{fontSize: 24, color: 'white'}}>
                    <Text style={{fontWeight: 900}}>{balance}</Text>
                    <Text> INR</Text>
                </Text>
            </View>

            <View style={styles.bottomBox}>
                <View style={[styles.center, {flex: 1, height: 80}]}>
                    <Text style={{color: 'white', fontSize: 12}}>INCOME THIS MOUNTH</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                        <Text style={{fontWeight: 900}}>{incomeThisMounth}</Text>
                        <Text> INR</Text>
                    </Text>
                </View>

                <View style={{backgroundColor: 'gray', height: 60, width: 1, borderRadius: 100}}></View>
                
                <View style={[styles.center, {flex: 1, height: 80}]}>
                    <Text style={{color: 'white', fontSize: 12}}>EXPENSES THIS MOUNTH</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                        <Text style={{fontWeight: 900}}>{expensesThisMounth}</Text>
                        <Text> INR</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        borderRadius: 20,
        display: 'flex',
        overflow: 'hidden',
        marginBlock: 10
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomBox: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomColor: 'gray',
        borderLeftColor: 'gray',
        borderRightColor: 'gray',
    }

})