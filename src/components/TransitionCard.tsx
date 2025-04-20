import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FeatherIcons from 'react-native-vector-icons/Feather';
import AccountModal from "../Database/Models/AccountModal";
import TransitionModal, { createOnType } from "../Database/Models/TransitionModal";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useContext, useState } from "react";
import BottomModal from "./BottomModal";
import { AppContext } from "../Contexts/App";
import { HomeContext } from "../screens/Home";


type TransitionCardProps = {
    id: string
    mode: 'income' | 'expenses' | 'transfer'
    title?: string
    description?: string
    accountId: string
    createOn: createOnType
    amount: number
}
const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function TransitionCard({id, mode, title, description, accountId, createOn, amount}: TransitionCardProps): React.JSX.Element {

    const {setTotalBalance, setAccounts} = useContext(AppContext);
    const {month, year, setTransitions, setTransitionsRecord} = useContext(HomeContext)

    const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const color = mode == 'income' ? 'rgb(25,200,150)' : 'gray';
    const accountName = AccountModal.findById(accountId)?.name;

    const date: string = `${months[createOn.month]} ${createOn.date}`;

    function deleteTansition(){
        if(!TransitionModal.deleteById(id)) return;
        
        setDeleteModalOpen(false);
        setTransitions(TransitionModal.findByDate(month, year));
        setTransitionsRecord(TransitionModal.getRecordByDate(month, year));
        setTotalBalance(AccountModal.getTotalBalance());
        setAccounts(AccountModal.getAll());
    }
    

    return (
        <View style={styles.root}>
            <View style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', flexDirection: 'row', paddingInline: 0}}>
                <Text style={styles.date}>{date}</Text>

                <Text style={{color, fontSize: 14}}>
                        <Text style={{fontWeight: 800}}>{mode == 'income' ? '+' : '-'}{amount}</Text>
                        <Text> INR</Text>
                </Text>
            </View>
            <View style={[styles.card]}>
                <View style={styles.mode}>
                    <Text style={{color: 'white', fontSize: 14, fontWeight: 900}}>{accountName || ''}</Text>
                </View>

                <View style={{paddingLeft: 10}}>
                    {title && <Text style={styles.title}>{title}</Text>}
                    {description && <Text numberOfLines={2} style={styles.description}>{description}{description?.at(-1) === '.' ? '' : '.'}</Text>}
                </View>
                
                <View style={{display: "flex", gap: 10, flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
                    <FeatherIcons name={mode == 'income' ? "download" : 'upload'} size={20} color={'white'} style={[styles.icon, {backgroundColor: color}]} />
                    <Text style={{color, fontSize: 20}}>
                        <Text style={{fontWeight: 800}}>{amount}</Text>
                        <Text> INR</Text>
                    </Text>
                </View>

                <TouchableOpacity 
                    onPress={() => setDeleteModalOpen(true)}
                    style={{backgroundColor: 'white', width: 44, aspectRatio: 1, borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 8, right: 8}}
                >
                    <MaterialIcons name="delete-outline" size={22} color={'crimson'} />
                </TouchableOpacity>

            </View>

            <BottomModal 
                visible={isDeleteModalOpen} 
                setVisible={setDeleteModalOpen} 
                actionButtons={[{title: 'Delete', onPress: deleteTansition, backgroundColor: 'crimson'}]} 
            >
                <Text style={{color: 'white', paddingLeft: 20}}>Are you sure you want to delete this transitions?</Text>
            </BottomModal>

        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        marginBlock: 10,
        display: 'flex',
        width: '100%',
        gap: 18,
        position: 'relative'
    },

    card: {
        display: 'flex', 
        alignItems: 'flex-start',
        width: '100%',
        padding: 14,
        paddingBlock: 20, 
        borderRadius: 14, 
        position: 'relative',
        gap: 10,
        backgroundColor: 'rgb(20,20,20)',
    },

    mode: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 34,
        paddingInline: 20,
        borderRadius: 1000,
        backgroundColor: 'black',
    },

    title: {
        display: 'flex',
        fontWeight: 900,
        color: 'white',
        fontSize: 16,
    },

    date: {
        fontSize: 24,
        fontWeight: 900,
        color: 'white',
    },

    description: {
        fontSize: 12,
        fontWeight: 800,
        opacity: 0.8,
        color: 'white',
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon: {
        aspectRatio: 1,
        borderRadius: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    }
})