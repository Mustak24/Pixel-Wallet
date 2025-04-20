import { MMKV } from "react-native-mmkv";

const AppStorage = new MMKV({id: 'app'});
const AccountsStorage = new MMKV({id: 'Accounts'});
const TransitionsStorage =  new MMKV({id: 'Transitions'});


export {AppStorage, AccountsStorage, TransitionsStorage};

