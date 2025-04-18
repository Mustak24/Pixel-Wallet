import { MMKV } from "react-native-mmkv";
import AccountModal from './Models/AccountModal'

const Storage = new MMKV({id: 'app'});

if(!Storage.contains("Transitions")){
    Storage.set("Transitions", '[]');
}

if(!Storage.contains('Accounts')){
    let acc = AccountModal.create({name: 'Cash', balance: 0, backgroundColor: 'rgb(25,200,150)'})
}


export default Storage;

