import { MMKV } from "react-native-mmkv";

const AppStorage = new MMKV({id: 'app'});
const AccountsStorage = new MMKV({id: 'Accounts'});
const TransactionsStorage =  new MMKV({id: 'Transactions'});


export {AppStorage, AccountsStorage, TransactionsStorage};

