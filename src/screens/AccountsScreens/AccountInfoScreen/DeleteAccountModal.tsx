import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AppContext } from "../../../Contexts/App";
import AccountModal from "../../../Database/Models/AccountModal";
import BottomModal from "../../../components/Modal/BottomModal";
import { View } from "react-native";
import { Text, TextInput } from "react-native-gesture-handler";


type PropsType = {
    visible: boolean, 
    setVisible: (val: boolean)=>void, 
    account: AccountModal
}

export default function DeleteAccountModal({visible, setVisible, account}: PropsType): React.JSX.Element {

    const {color, setAccounts, setTotalBalance} = useContext(AppContext);
    const [textValue, setTextValue] = useState('');

    const navigation = useNavigation();

    function deleteAccount(){
        let acc = AccountModal.deleteById(account.id);
        if(!acc) return;

        setAccounts(AccountModal.getAll());
        setTotalBalance(AccountModal.getTotalBalance());
        navigation.goBack();
    }

    return (
        <BottomModal 
            visible={visible} 
            setVisible={setVisible}
            actionButtons={[
                {
                    title: 'Delete', 
                    backgroundColor: textValue !== account.name ? "rgb(200,100,100)" : 'rgb(250,50,50)', 
                    onPress: deleteAccount
                }
            ]}
        >
            <View style={{paddingInline: 20}}>
                <Text style={{fontSize: 16, fontWeight: '900', color: 'rgb(250,60,60)'}}>To confirm, type "{account.name}"</Text>
                <Text style={{opacity: 0.6, color: 'rgb(250,60,60)'}}>Once you delete a account, there is no going back.</Text>

                <TextInput 
                    value={textValue} 
                    onChangeText={setTextValue}
                    placeholder='Enter Account Name'
                    style={{fontSize: 18, fontWeight: 900, color, opacity: textValue ? 1 : 0.4, borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 20}}
                    placeholderTextColor={color}
                    autoFocus={true}
                />
            </View>
        </BottomModal>
    )
}