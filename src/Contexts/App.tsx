import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"
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

    isTabBarHide: boolean,
    setTabBarHide: Dispatch<SetStateAction<boolean>>,
}


const defaultState = {
    totalBalance: 0, setTotalBalance: ()=>{},
    accounts: [], setAccounts: ()=>{},
    color: 'white', setColor: ()=>{},
    backgroundColor: 'black', setBackgroundColor: ()=>{},
    isTabBarHide: false, setTabBarHide: ()=>{}
}


export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const AppContext = createContext<AppContextType>(defaultState);

export default function AppContextProvider({children}: {children: React.ReactNode}){

    const [totalBalance, setTotalBalance] = useState<number>(AccountModal.getTotalBalance());
    const [accounts, setAccounts] = useState<AccountModal[]>(AccountModal.getAll());
    const [color, setColor] = useState<string>('white');
    const [backgroundColor, setBackgroundColor] = useState<string>('black');
    const [isTabBarHide, setTabBarHide] = useState<boolean>(false);

    const states: AppContextType = {
        totalBalance, setTotalBalance, 
        accounts, setAccounts,
        color, setColor,
        backgroundColor, setBackgroundColor,
        isTabBarHide, setTabBarHide
    }

    return <AppContext.Provider value={states}>
        {children}
    </AppContext.Provider>
}