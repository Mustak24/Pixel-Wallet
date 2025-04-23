import { StyleSheet, View } from "react-native";
import Home from "./src/screens/Home";
import BottomTabNavbar from "./src/components/BottomTabNavbar";
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accounts from "./src/screens/AccountScreen/Accounts";
import Transition from "./src/screens/Transition";
import AppContextProvider, { AppContext } from "./src/Contexts/App";
import AccountModal from "./src/Database/Models/AccountModal";
import AccountInfo from "./src/screens/AccountScreen/AccountInfo";
import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TransitionModal from "./src/Database/Models/TransitionModal";
import style from './AppStyle'
import CreateTranstion from "./src/screens/AccountScreen/CreateTransiton";


const Tab = createBottomTabNavigator<stackParamsList>();

export default function App(): React.JSX.Element {

  const {backgroundColor} = useContext(AppContext);

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
        <View style={[style.center, style.width100, style.height100, {overflow: 'hidden'}]}>
          <View style={{width: '100%', flex: 1}}>
            <Tab.Navigator 
              initialRouteName="home"
              screenOptions={{ headerShown: false }}
              tabBar={(props) => {
                let routeName = getFocusedRouteNameFromRoute(props.state.routes[props.state.index]) ?? props.state.routes[props.state.index].name;
                return ['home', 'accounts'].includes(routeName) ? (
                  <BottomTabNavbar {...props} />
                ) : null;
              }}
            >
              <Tab.Screen name="home" component={Home} />
              <Tab.Screen name="transition" component={Transition} />
              <Tab.Screen name="accounts" component={AccountStackScreens} />
            </Tab.Navigator>
          </View>
        </View>
      </NavigationContainer>
    </AppContextProvider>
  )
}


const AccountStack = createStackNavigator<AccountStackParamsList>();

function AccountStackScreens(){
  
  return (
    <AccountStack.Navigator initialRouteName="accounts" screenOptions={{headerShown: false}}>
      <AccountStack.Screen name="accounts" component={Accounts} />
      <AccountStack.Screen name="account-info" component={AccountInfo} />
      <AccountStack.Screen name="create-transition" component={CreateTranstion} />
    </AccountStack.Navigator>
  )
}



const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }
})


export type AccountStackParamsList = {
  'accounts': undefined,
  'account-info': {account: AccountModal},
  'create-transition': {mode: 'income' | 'expense' | 'transfer', account: AccountModal},
  'update-transition': {transition: TransitionModal}
}


export type stackParamsList = {
  'transition': {
      mode: 'income' | 'expense' | 'transfer',
  },
  'home': undefined,
  'accounts': undefined
}
