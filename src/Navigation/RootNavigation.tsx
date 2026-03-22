import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountModal from "../Database/Models/AccountModal";
import TransactionModal from "../Database/Models/TransactionModal";
import SettingScreen from "../Screens/SettingScreen";
import TransactionScreen from "../Screens/TransactionScreen";
import TransactionUpdateScreen from "../Screens/TransactionUpdateScreen";
import AccountInfoScreen from "../Screens/TabNavigationScreens/AccountScreens/AccountInfoScreen";
import TabNavigation from "./TabNavigation";
import { NavigationRef } from "./NavigationService";

export type RootNavigationParamsList = {
    'setting-screen': undefined,
    'transaction-screen': { mode: 'income' | 'expense' | 'transfer', account?: AccountModal},
    'transaction-update-screen': {transaction: TransactionModal},
    'account-info-screen': {account: AccountModal},
    'tab-navigation': undefined
}


const Stack = createStackNavigator<RootNavigationParamsList>();


export default function RootNavitaion(): React.JSX.Element {
    return (
        <NavigationContainer ref={NavigationRef} >
            <Stack.Navigator 
                initialRouteName="tab-navigation" 
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name="setting-screen" component={SettingScreen} 
                    options={{animation: 'scale_from_center'}} 
                />
                <Stack.Screen name="transaction-screen" component={TransactionScreen} 
                    options={{animation: 'scale_from_center'}}
                />
                <Stack.Screen name="transaction-update-screen" component={TransactionUpdateScreen} 
                    options={{animation: 'slide_from_right'}}
                />
                <Stack.Screen name="account-info-screen" component={AccountInfoScreen} 
                    options={{animation: 'slide_from_right'}}
                />
                <Stack.Screen name="tab-navigation" component={TabNavigation} 
                    options={{animation: 'scale_from_center'}} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}