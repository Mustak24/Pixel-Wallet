import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AccountModal from "../Database/Models/AccountModal";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useContext, useState } from "react";
import BottomModal from "./BottomModal";
import { AppContext } from "../Contexts/App";

type AccountCardProps = {
    id: string,
    incomeThisMonth: number,
    expensesThisMonth: number,
    backgroundColor: string,
    balance: number,
    name: string
}

export default function AccountCard({id, incomeThisMonth, expensesThisMonth, backgroundColor, balance, name}: AccountCardProps): React.JSX.Element{

    const {setAccounts, setTotalBalance} = useContext(AppContext);

    const account = AccountModal.findById(id);
    if(!account) return <></>;

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    function deleteAccount(){
        AccountModal.deleteById(id);
        setAccounts(AccountModal.getAll());
        setTotalBalance(AccountModal.getTotalBalance());
        
    }

    return (
        <View style={styles.root}>

            <View style={{display: 'flex', backgroundColor, width: "100%", padding: 20, gap: 12, position: 'relative'}}>
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
                        <Text style={{fontWeight: 900}}>{incomeThisMonth}</Text>
                        <Text> INR</Text>
                    </Text>
                </View>

                <View style={{backgroundColor: 'gray', height: 60, width: 1, borderRadius: 100}}></View>
                
                <View style={[styles.center, {flex: 1, height: 80}]}>
                    <Text style={{color: 'white', fontSize: 12}}>EXPENSES THIS MOUNTH</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                        <Text style={{fontWeight: 900}}>{expensesThisMonth}</Text>
                        <Text> INR</Text>
                    </Text>
                </View>
            </View>

            <TouchableOpacity 
                onPress={() => setDeleteModalOpen(true)}
                style={{backgroundColor: 'white', width: 44, aspectRatio: 1, borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 8, right: 8}}
            >
                <MaterialIcons name="delete-outline" size={22} color={'crimson'} />
            </TouchableOpacity>

            <BottomModal visible={isDeleteModalOpen} setVisible={setDeleteModalOpen} actionButtons={[{title: 'Delete', onPress: deleteAccount, backgroundColor: 'crimson'}]} >
                <Text style={{color: 'white', paddingLeft: 20}}>Are you sure you want to delete {name} account?</Text>
            </BottomModal>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        borderRadius: 20,
        display: 'flex',
        overflow: 'hidden',
        marginBlock: 10,
        position: 'relative'
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