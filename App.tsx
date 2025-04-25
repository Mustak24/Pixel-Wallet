import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppContextProvider from "./src/Contexts/App";
import AccountModal from "./src/Database/Models/AccountModal";
import style from './AppStyle'
import TabNavigation from "./src/Navigation/TabNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App(): React.JSX.Element {

  let accounts = AccountModal.getAll();

  let hasCashAccount = false;
  let hasBankAccount = false;  
  
  for(let {name} of accounts){
    if(hasCashAccount && hasBankAccount) break;
    if (name === 'Cash') hasCashAccount = true;
    if (name === 'Bank') hasBankAccount = true;
  }

  if(!hasCashAccount) AccountModal.create({name: 'Cash', balance: 0, backgroundColor: 'rgb(25,200,150)'});
  if(!hasBankAccount) AccountModal.create({name: 'Bank', balance: 0, backgroundColor: 'rgb(130,100,255)'});

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppContextProvider>
        <NavigationContainer>
          <View style={[style.center, style.width100, style.height100]}>
            <View style={{width: '100%', flex: 1, height: '100%'}}>
              <TabNavigation />
            </View>
          </View>
        </NavigationContainer>
      </AppContextProvider>
    </GestureHandlerRootView>
  )
}

