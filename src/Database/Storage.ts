import { MMKV } from "react-native-mmkv";
import AccountModal from './Models/AccountModal'

const AppStorage = new MMKV({id: 'app'});
const AccountsStorage = new MMKV({id: 'Accounts'});
const TransitionsStorage =  new MMKV({id: 'Transitions'});

if(!AccountsStorage.getAllKeys().length){
    let acc = AccountModal.create({name: 'Cash', balance: 0, backgroundColor: 'rgb(25,200,150)'})
    AccountsStorage.set(acc.id, JSON.stringify(acc));
}


export {AppStorage, AccountsStorage, TransitionsStorage};

