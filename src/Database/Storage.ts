import { MMKV } from "react-native-mmkv";
import AccountModal from './Models/AccountModal'

const Storage = new MMKV({id: 'app'});
const Accounts = new MMKV({id: 'Accounts'});
const Transitions =  new MMKV({id: 'Transitions'});

if(!Accounts.getAllKeys().length){
    let acc = AccountModal.create({name: 'Cash', balance: 0, backgroundColor: 'rgb(25,200,150)'})
    Accounts.set(acc.id, JSON.stringify(acc));
}


export {Storage, Accounts, Transitions};

