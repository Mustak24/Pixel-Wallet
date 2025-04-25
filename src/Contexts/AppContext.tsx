import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"
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
}


const defaultState = {
    totalBalance: 0, setTotalBalance: ()=>{},
    accounts: [], setAccounts: ()=>{},
    color: 'white', setColor: ()=>{},
    backgroundColor: 'black', setBackgroundColor: ()=>{},
    username: 'Undefinde', setUsername: ()=>{}
}


export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const AppContext = createContext<AppContextType>(defaultState);

export default function AppContextProvider({children}: {children: React.ReactNode}){

    const [totalBalance, setTotalBalance] = useState<number>(AccountModal.getTotalBalance());
    const [accounts, setAccounts] = useState<AccountModal[]>(AccountModal.getAll());
    const [color, setColor] = useState<string>(AppStorage.getString('color') ?? 'white');
    const [backgroundColor, setBackgroundColor] = useState<string>(AppStorage.getString('backgroundColor') ?? 'black');
    const [username, setUsername] = useState<string>(AppStorage.getString('username') ?? 'Undefinde');

    const states: AppContextType = {
        totalBalance, setTotalBalance, 
        accounts, setAccounts,
        color, setColor,
        backgroundColor, setBackgroundColor,
        username, setUsername
    }

    return <AppContext.Provider value={states}>
        {children}
    </AppContext.Provider>
}