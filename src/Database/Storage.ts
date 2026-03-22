import { MMKV } from "react-native-mmkv";

const AppStorage = new MMKV({id: 'app'});
const AccountsStorage = new MMKV({id: 'Accounts'});
const TransactionsStorage =  new MMKV({id: 'Transactions'});
const VersionStorage = new MMKV({id: 'version-storage'});


export {AppStorage, AccountsStorage, TransactionsStorage, VersionStorage};

