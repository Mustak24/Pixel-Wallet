import { createContext, Dispatch, SetStateAction, useState } from "react"
import AccountModal from "../Database/Models/AccountModal";

type AppContextType = {
    totalBalance: number,
    setTotalBalance: Dispatch<SetStateAction<number>>,

    accounts: AccountModal[],
    setAccounts: Dispatch<SetStateAction<AccountModal[]>>,    
}


const defaultState = {
    totalBalance: 0, setTotalBalance: ()=>{},
    accounts: [], setAccounts: ()=>{},
}



export const AppContext = createContext<AppContextType>(defaultState);

export default function AppContextProvider({children}: {children: React.ReactNode}){

    const [totalBalance, setTotalBalance] = useState<number>(AccountModal.getTotalBalance());
    const [accounts, setAccounts] = useState<AccountModal[]>(AccountModal.getAll());

    const states: AppContextType = {
        totalBalance, setTotalBalance, 
        accounts, setAccounts,
    }

    return <AppContext.Provider value={states}>
        {children}
    </AppContext.Provider>
}