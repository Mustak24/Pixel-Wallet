import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AppContext } from "../../../Contexts/App";
import AccountModal from "../../../Database/Models/AccountModal";
import BottomModal from "../../../components/Modal/BottomModal";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Calculator from "../../../components/Calculator";
import TransitionModal from "../../../Database/Models/TransitionModal";

const colors = ['rgb(170,50,50)', 'rgb(170,100,50)', 'rgb(170,140,50)', 'rgb(170,170,50)', 'rgb(50,170,100)', 'rgb(25,200,150)', 'rgb(50,150,120)', 'rgb(50,170,170)','rgb(50,130,170)', 'rgb(50,100,170)','rgb(100,50,170)', 'rgb(120,50,170)', 'rgb(170,50,150)', 'rgb(170,50,100)']


type UpdateAccountInfoModalProps = {
    visible: boolean, setVisible: Dispatch<SetStateAction<boolean>>,
    setTransitions: Dispatch<SetStateAction<TransitionModal[]>>,
    account: AccountModal,
    month: number,
    year: number 
}

export default function UpdateAccountInfoModal({visible, setVisible, account, setTransitions, month, year}: UpdateAccountInfoModalProps): React.JSX.Element {

    const {setAccounts, setTotalBalance} = useContext(AppContext);

    const [name, setName] = useState<string>(account.name);
    const [balance, setBalance] = useState<number>(account.balance);
    const [backgroundColor, setBackgroundColor] = useState<string>(account.backgroundColor);

    const [isCalOpen, setCalOpen] = useState(false);

    function update() {
        if(!name) return;

        if(account.balance != balance) {
            let tra = TransitionModal.create({
                mode: account.balance < balance ? 'income' : 'expense', 
                title: 'Adjust Balance', 
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
        setTransitions(TransitionModal.findByDate(month, year).filter(tra => tra.fromAccountId == account.id))
    }

    return (
        <BottomModal backdropColor="rgba(0,0,0,.94)" visible={visible} setVisible={setVisible} actionButtons={[{title: 'Save', onPress: update, backgroundColor: 'rgb(25, 200, 150)'}]}  >
            <View style={{paddingBlock: 10}}>
                <View style={{display: 'flex', paddingInline: 20, width: '100%'}}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 900}}>Account Options</Text>

                    <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10, width: '100%', position: 'relative', marginBlock: 20}}>
                        <MaterialIcons name="account-balance-wallet" size={22} color={'rgba(255,255,255,.6)'} style={{backgroundColor, padding: 10, borderRadius: 1000}} />
                        <View style={{display: 'flex', justifyContent: 'flex-end', flex: 1}}>
                            <TextInput
                                value={name} 
                                placeholder="Account Name" 
                                style={{fontSize: 18, fontWeight: '900', color: 'white'}} 
                                onChangeText={setName}
                                />
                            <View style={{width: '100%', backgroundColor: 'gray', height: 1, position: 'relative', top: -5}}></View>
                        </View>
                    </View>
                </View>

                <Text style={{paddingInline: 20, marginBlock: 10, color: 'white', fontSize: 16, fontWeight: 900}}>Select Color</Text>

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
                    <Text style={{color: 'white', opacity: .5, fontSize: 10, fontWeight: 800}}>Enter Account Balance</Text>
                    <Text style={{color: 'white', fontSize: 28, fontWeight: 900}}>
                        <Text>{balance || '0.00'}</Text>
                        <Text> INR</Text>
                    </Text>
                </Pressable>

                <BottomModal visible={isCalOpen} setVisible={setCalOpen} actionButtons={[{title: 'Set', onPress: () => setCalOpen(false), backgroundColor}]} >
                    <Text style={{color: 'white', fontSize: 12, fontWeight: 800, paddingLeft: 20, marginBottom: 20, opacity: .5}}>Enter Account Balance :</Text>
                    <Calculator value={balance} onResult={setBalance} />
                </BottomModal>
            </View>
        </BottomModal>
    )
}