import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import AccountModal from "../Database/Models/AccountModal";
import { AppStorage } from "../Database/Storage";

type AppContextType = {
    totalBalance: number,
    setTotalBalance: Dispatch<SetStateAction<number>>,

    accounts: AccountModal[],
    setAccounts: Dispatch<SetStateAction<AccountModal[]>>,    

    color: string,
    setColor: Dispatch<SetStateAction<string>>,

    backgroundColor: string,
    setBackgroundColor: Dispatch<SetStateAction<string>>,

    username: string,
    setUsername: Dispatch<SetStateAction<string>>,

    categorys: string[],
    setCategorys: Dispatch<SetStateAction<string[]>>,

    isNeedTransitionRefresh: number;
    setNeedTransitionRefresh: Dispatch<SetStateAction<number>>
}


const defaultState = {
    totalBalance: 0, setTotalBalance: ()=>{},
    accounts: [], setAccounts: ()=>{},
    color: 'white', setColor: ()=>{},
    backgroundColor: 'black', setBackgroundColor: ()=>{},
    username: 'Guest', setUsername: ()=>{},
    categorys: [], setCategorys: ()=>{},
    isNeedTransitionRefresh: 0, setNeedTransitionRefresh: ()=>{}
}


export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const AppContext = createContext<AppContextType>(defaultState);

export default function AppContextProvider({children}: {children: React.ReactNode}){

    let accounts_ = AccountModal.getAll();

    let hasCashAccount = false;
    let hasBankAccount = false;  

    for(let {name} of accounts_){
    if(hasCashAccount && hasBankAccount) break;
    if (name === 'Cash') hasCashAccount = true;
    if (name === 'Bank') hasBankAccount = true;
    }

    if(!hasCashAccount) AccountModal.create({name: 'Cash', balance: 0, backgroundColor: 'rgb(25,200,150)'});
    if(!hasBankAccount) AccountModal.create({name: 'Bank', balance: 0, backgroundColor: 'rgb(130,100,255)'});


    let categorys_ = JSON.parse(AppStorage.getString('categorys') || '[]');
    if(categorys_.length == 0) {
        AppStorage.set('categorys', JSON.stringify(['🍹 Food & Drinks','📜 Bills & Fees','🚍 Transport','🛒 Shopping','🎁 Gifts','💊 Health']))
        categorys_ = ['🍹 Food & Drinks','📜 Bills & Fees','🚍 Transport','🛒 Shopping','🎁 Gifts','💊 Health']
    }

    const [totalBalance, setTotalBalance] = useState<number>(AccountModal.getTotalBalance());
    const [accounts, setAccounts] = useState<AccountModal[]>(AccountModal.getAll());
    const [color, setColor] = useState<string>(AppStorage.getString('color') ?? 'white');
    const [backgroundColor, setBackgroundColor] = useState<string>(AppStorage.getString('backgroundColor') ?? 'black');
    const [username, setUsername] = useState<string>(AppStorage.getString('username') ?? 'Guest');
    const [categorys, setCategorys] = useState<string[]>(categorys_);
    const [isNeedTransitionRefresh, setNeedTransitionRefresh] = useState<number>(0);

    const states: AppContextType = {
        totalBalance, setTotalBalance, 
        accounts, setAccounts,
        color, setColor,
        backgroundColor, setBackgroundColor,
        username, setUsername,
        categorys, setCategorys,
        isNeedTransitionRefresh, setNeedTransitionRefresh
    }

    return <AppContext.Provider value={states}>
        {children}
    </AppContext.Provider>
}


export function useAppContext(): AppContextType {
    return useContext(AppContext);
}