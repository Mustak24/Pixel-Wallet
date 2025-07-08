import { Dispatch, SetStateAction, useState } from "react";
import BottomModal from "./BottomModal";
import { Text, View } from "react-native";
import MaterialIcon from "../Icon/MaterialIcon";
import { useAlert } from "../Alert/AlertProvider";
import FeatherIcon from "../Icon/FeatherIcon";
import NoralTextInput from "../Other/NoralTextInput";


type Props = {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    massage: string,
    passkey: string,
    handleDelete: () => void
}

export default function DeleteModal({visible, setVisible, massage, passkey, handleDelete}: Props): React.JSX.Element {

    const [text, setText] = useState<string>('');
    const {setAlert} = useAlert();

    function handleOnDelete(){
        if(text !== passkey) return setAlert({
            id: 'delete-modal', massage: 'to delete enter valid keyword !!!', type: 'error'
        });

        handleDelete();
    } 

    return (
        <BottomModal 
            alertId="delete-modal"
            visible={visible} 
            setVisible={setVisible} 
            style={{padding: 20, gap: 8}} 
            actionButtons={[{
                title: 'Delete', onPress: handleOnDelete, backgroundColor: 'rgb(250,10,50)', 
                icon: <MaterialIcon name="delete" size={20} color="white" />
            }]}    
        >
            <Text style={{color: 'rgb(250,10,50)', fontSize: 20, fontWeight: 900}} >Delete Warning</Text>
            <Text style={{fontWeight: 700, fontSize: 14, color: 'rgb(250,10,50)'}} >{massage}</Text>
            
            
            <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderBottomWidth: 2, borderColor: 'rgb(250,10,50)', gap: 12}} >
                <FeatherIcon name="key" size={28} color="'rgb(250,10,50)'" />

                <NoralTextInput
                    placeholder={`Type ${passkey}`}
                    color="rgb(250,10,50)"
                    style={{fontSize: 24, fontWeight: 900, flex: 1}}
                    onChangeText={setText}
                />
            </View>
            <Text style={{fontWeight: 700, fontSize: 14, color: 'rgb(250,10,50)'}} >
                {`Type "${passkey}" for delete`}
            </Text>

            <View style={{minHeight: 40}} />
        </BottomModal>
    )
}