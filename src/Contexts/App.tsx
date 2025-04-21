import { createContext, Dispatch, SetStateAction, useState } from "react"
import AccountModal from "../Database/Models/AccountModal";

type AppContextType = {
    totalBalance: number,
    setTotalBalance: Dispatch<SetStateAction<number>>,

    accounts: AccountModal[],
    setAccounts: Dispatch<SetStateAction<AccountModal[]>>,    

    color: string,
    setColor: Dispatch<SetStateAction<string>>,

    backgroundColor: string,
    setBackgroundColor: Dispatch<SetStateAction<string>>,
}


const defaultState = {
    totalBalance: 0, setTotalBalance: ()=>{},
    accounts: [], setAccounts: ()=>{},
    color: 'white', setColor: ()=>{},
    backgroundColor: 'black', setBackgroundColor: ()=>{},
}



export const AppContext = createContext<AppContextType>(defaultState);

export default function AppContextProvider({children}: {children: React.ReactNode}){

    const [totalBalance, setTotalBalance] = useState<number>(AccountModal.getTotalBalance());
    const [accounts, setAccounts] = useState<AccountModal[]>(AccountModal.getAll());
    const [color, setColor] = useState<string>('white');
    const [backgroundColor, setBackgroundColor] = useState<string>('black');

    const states: AppContextType = {
        totalBalance, setTotalBalance, 
        accounts, setAccounts,
        color, setColor,
        backgroundColor, setBackgroundColor,
    }

    return <AppContext.Provider value={states}>
        {children}
    </AppContext.Provider>
}