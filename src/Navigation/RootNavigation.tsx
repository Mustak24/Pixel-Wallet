import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountModal from "../Database/Models/AccountModal";
import TransitionModal from "../Database/Models/TransitionModal";
import SettingScreen from "../Screen/SettingScreen";
import TransitionScreen from "../Screen/TransitionScreen";
import TransitionUpdateScreen from "../Screen/TransitionUpdateScreen";
import AccountInfoScreen from "../Screen/TabNavigationScreens/AccountScreens/AccountInfoScreen";
import TabNavigation from "./TabNavigation";
import { NavigationRef } from "./NavigationService";

export type RootNavigationParamsList = {
    'setting-screen': undefined,
    'transition-screen': { mode: 'income' | 'expense' | 'transfer', account?: AccountModal},
    'transition-update-screen': {transition: TransitionModal},
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
                <Stack.Screen name="transition-screen" component={TransitionScreen} 
                    options={{animation: 'scale_from_center'}}
                />
                <Stack.Screen name="transition-update-screen" component={TransitionUpdateScreen} 
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