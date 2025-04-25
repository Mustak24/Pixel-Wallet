import { Pressable, View } from "react-native"
import { ScrollView, Text } from "react-native-gesture-handler"
import RoundedView from "./RoundedView"
import AccountModal from "../Database/Models/AccountModal"
import { useState } from "react"

type Props = {accounts: AccountModal[], useAccount: AccountModal, setUseAccount: (acc: AccountModal) => void, title: string}

export default function AccountSelector({accounts, useAccount, setUseAccount, title}: Props) {
    
    const [selAcc, setSelAcc] = useState(accounts.indexOf(useAccount))

    return (
        <View style={{display: 'flex', width: '100%', alignItems: 'flex-start'}} >
            <Text style={{color: 'white', fontSize: 16, fontWeight: '900', paddingLeft: 20}}>{title}</Text>

            <ScrollView 
                style={{width: '100%', height: 50, marginBlock: 16}} 
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                ref={(scrollView) => {
                    if (scrollView) {
                        setTimeout(() => {
                            scrollView.scrollTo({ x: selAcc * 80, animated: true });
                        }, 0);
                    }
                }}
            >       
                {
                    accounts.map((acc, index) => {
                        return (
                            <Pressable key={acc.name} onPress={() => {setUseAccount(acc); setSelAcc(index);}} style={{marginLeft: 16}}>
                                <RoundedView  
                                    key={acc.id} 
                                    title={acc.name} 
                                    color="white" 
                                    backgroundColor={selAcc == index ? acc.backgroundColor : 'transparent'}
                                    style={{borderWidth: 1, borderColor: 'gray'}} 
                                />
                            </Pressable>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}