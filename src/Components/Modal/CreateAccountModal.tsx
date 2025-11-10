import { Dispatch, SetStateAction, useState } from "react";
import { useAppContext } from "../../Contexts/AppContext";
import { useAlert } from "../Alert/AlertProvider";
import AccountModal from "../../Database/Models/AccountModal";
import BottomModal from "./BottomModal";
import { Pressable, ScrollView, View } from "react-native";
import { TextTheme } from "../../Contexts/ThemeProvider";
import MaterialIcon from "../Icon/MaterialIcon";
import NoralTextInput from "../Other/NoralTextInput";
import Calculator from "../Other/Calculator";

const colors = ['rgb(170,50,50)', 'rgb(170,100,50)', 'rgb(170,140,50)', 'rgb(170,170,50)', 'rgb(50,170,100)', 'rgb(25,200,150)', 'rgb(50,150,120)', 'rgb(50,170,170)','rgb(50,130,170)', 'rgb(50,100,170)','rgb(100,50,170)', 'rgb(120,50,170)', 'rgb(170,50,150)', 'rgb(170,50,100)']


type Props = {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
}

export default function CreateAccountModal({visible, setVisible}: Props): React.JSX.Element {

    const {setAccounts, setTotalBalance, currency} = useAppContext();
    const {alert, setAlert} = useAlert();

    const [name, setName] = useState<string>('');
    const [balance, setBalance] = useState<number>(0);
    const [backgroundColor, setBackgroundColor] = useState<string>('rgb(25,200,150)');

    const [isCalOpen, setCalOpen] = useState(false);

    function create() {
        if(!name) return setAlert({type: 'error', massage: 'Plase enter account name', id: 'modal'});
        AccountModal.create({name, balance, backgroundColor});

        setName('');
        setBalance(0);
        setVisible(false);

        setAccounts(AccountModal.getAll());
        setTotalBalance(AccountModal.getTotalBalance());
    }

    return (
        <BottomModal visible={visible} setVisible={setVisible} actionButtons={[{title: 'Add', onPress: create, backgroundColor: 'rgb(25, 200, 150)'}]}  >
            <View style={{paddingBlock: 10}}>
                <View style={{display: 'flex', paddingInline: 20, width: '100%'}}>
                    <TextTheme style={{color: 'white', fontSize: 18, fontWeight: 900}}>Account Options</TextTheme>

                    <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10, width: '100%', position: 'relative', marginBlock: 20}}>
                        <MaterialIcon name="account-balance-wallet" size={22} color={'rgba(255,255,255,.6)'} style={{backgroundColor, padding: 10, borderRadius: 1000}} />
                        <View style={{display: 'flex', justifyContent: 'flex-end', flex: 1}}>
                            <NoralTextInput
                                value={name} 
                                placeholder="Account Name"
                                style={{fontSize: 18, fontWeight: '900'}} 
                                onChangeText={setName}
                            />
                            <View style={{width: '100%', backgroundColor: 'gray', height: 1, position: 'relative', top: -5}}></View>
                        </View>
                    </View>
                </View>

                <TextTheme style={{paddingInline: 20, marginBlock: 10, color: 'white', fontSize: 16, fontWeight: 900}}>Select Color</TextTheme>

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
                    <TextTheme style={{color: 'white', opacity: .5, fontSize: 10, fontWeight: 800}}>Enter Account Balance</TextTheme>
                    <TextTheme style={{color: 'white', fontSize: 28, fontWeight: 900}}>
                        <TextTheme>{balance || '0.00'}</TextTheme>
                        <TextTheme> {currency}</TextTheme>
                    </TextTheme>
                </Pressable>

                <BottomModal visible={isCalOpen} setVisible={setCalOpen} actionButtons={[{title: 'Set', onPress: () => setCalOpen(false), backgroundColor}]} >
                    <TextTheme style={{color: 'white', fontSize: 14, fontWeight: 800, paddingLeft: 20, marginBottom: 20, opacity: .6}}>Enter Account Balance :</TextTheme>
                    <Calculator value={balance} onResult={setBalance} />
                </BottomModal>
            </View>
        </BottomModal>
    )
}