import { Pressable, View } from "react-native"
import { ScrollView, Text } from "react-native-gesture-handler"
import RoundedView from "./RoundedView"
import AccountModal from "../Database/Models/AccountModal"
import { useState } from "react"

type Props = {accounts: AccountModal[], useAccount: AccountModal, setUseAccount: (acc: AccountModal) => void, title: string}

export default function AccountSelector({accounts, useAccount, setUseAccount, title}: Props) {


    return (
        <View style={{display: 'flex', width: '100%', alignItems: 'flex-start'}} >
            <Text style={{color: 'white', fontSize: 16, fontWeight: '900', paddingLeft: 20}}>{title}</Text>

            <ScrollView 
                style={{width: '100%', height: 50, marginBlock: 16}} 
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                ref={(scrollView) => {
                    let selAccIndex = 0;
                    for(let i=0; i<accounts.length; i++) 
                        if(accounts[i].id == useAccount.id){ 
                            selAccIndex = i; 
                            break; 
                    }

                    if (scrollView) {
                        setTimeout(() => {
                            scrollView.scrollTo({ x: selAccIndex * 80, animated: true });
                        }, 0);
                    }
                }}
            >       
                {
                    accounts.map((acc) => {
                        return (
                            <Pressable key={acc.name} onPress={() => {setUseAccount(acc);}} style={{marginLeft: 16}}>
                                <RoundedView  
                                    key={acc.id} 
                                    title={acc.name} 
                                    color="white" 
                                    backgroundColor={useAccount.id == acc.id ? acc.backgroundColor : 'transparent'}
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