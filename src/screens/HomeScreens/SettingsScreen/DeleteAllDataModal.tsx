import { View } from "react-native";
import BottomModal from "../../../components/Modal/BottomModal";
import { Text, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAppContext } from "../../../Contexts/AppContext";
import { AppStorage } from "../../../Database/Storage";
import FeatherIcons from 'react-native-vector-icons/Feather';
import AccountModal from "../../../Database/Models/AccountModal";
import TransitionModal from "../../../Database/Models/TransitionModal";
import { useTheme } from "../../../Contexts/ThemeProvider";


type PropsType = {
    visible: boolean, 
    setVisible: (val: boolean)=>void, 
}

export default function DeleteAllData({visible, setVisible}: PropsType): React.JSX.Element {

    const username = AppStorage.getString('username') ?? 'Undefinde';

    const navigation = useNavigation();
    
    
    const {setAccounts, setTotalBalance} = useAppContext();
    const {primaryColor: color} = useTheme();

    const [textValue, setTextValue] = useState('');



    function deleteAccount(){
        if(username != textValue) return;

        try{
            AccountModal.getAll().forEach(acc => AccountModal.deleteById(acc.id));
            
            TransitionModal.getAll().forEach(tra => TransitionModal.deleteById(tra.id));

            AccountModal.create({name: 'Cash', balance: 0, backgroundColor: 'rgb(25,200,150)'});
            AccountModal.create({name: 'Bank', balance: 0, backgroundColor: 'rgb(130,100,255)'});
            
            setAccounts(AccountModal.getAll());
            setTotalBalance(AccountModal.getTotalBalance());

            navigation.goBack();
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <BottomModal 
            visible={visible} 
            setVisible={setVisible}
            actionButtons={[
                {
                    title: 'Delete', 
                    backgroundColor: textValue !== username ? "rgb(200,100,100)" : 'rgb(250,50,50)', 
                    onPress: deleteAccount,
                    icon: <FeatherIcons name="trash-2" size={20} color={'white'} />
                }
            ]}
        >
            <View style={{paddingInline: 20}}>
                <Text style={{fontSize: 16, fontWeight: '900', color: 'rgb(250,60,60)'}}>To confirm, type "{username}"</Text>
                <Text style={{opacity: 0.8, color: 'rgb(250,60,60)'}}>Once you delete a Data, there is no going back.</Text>

                <TextInput 
                    value={textValue} 
                    onChangeText={setTextValue}
                    placeholder='Type here...'
                    style={{fontSize: 18, fontWeight: 900, color, opacity: textValue ? 1 : 0.5, borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 20}}
                    placeholderTextColor={color}
                    autoFocus={true}
                />
            </View>
        </BottomModal>
    )
}