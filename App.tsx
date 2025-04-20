import { StyleSheet, View } from "react-native";
import Home from "./src/screens/Home";
import BottomTabNavbar from "./src/components/BottomTabNavbar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accounts from "./src/screens/Accounts";
import Transition from "./src/screens/Transition";
import AppContextProvider from "./src/Contexts/App";
import AccountModal from "./src/Database/Models/AccountModal";


const Tab = createBottomTabNavigator<stackParamsList>();

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
    <AppContextProvider>
      <NavigationContainer>
        <View style={styles.root}>
          <View style={{width: '100%', flex: 1}}>
            <Tab.Navigator 
              tabBar={(props) => <BottomTabNavbar {...props} />} 
              screenOptions={{headerShown: false}} 
              >
              <Tab.Screen name="home" component={Home} />
              <Tab.Screen name="accounts" component={Accounts} />
              <Tab.Screen name="transition" component={Transition} />
            </Tab.Navigator>
          </View>
        </View>
      </NavigationContainer>
    </AppContextProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    paddingTop: 40,
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }
})


export type stackParamsList = {
  transition: {
      mode: 'income' | 'expenses' | 'transfer',
  },
  home: undefined,
  accounts: undefined
}
