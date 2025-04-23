import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/HomeScreens/Home";
import HomeStackNavigator from "./StackNavigation/HomeStackNavigator";
import AccountsStackNavigator from "./StackNavigation/AccountsStackNavigator";
import Transition from "../screens/Transition";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import BottomTabNavbar from "../components/BottomTabNavbar";


export type TabParamsList = {
    'home-stack-navigator': undefined,
    'accounts-stack-navigator': undefined,
    'transition': {mode: 'income'| 'expense' | 'transfer'}
}

const Tab = createBottomTabNavigator<TabParamsList>();

const tabBarRoutesName: string[] = ['home-stack-navigator', 'accounts-stack-navigator', 'accounts', 'home']

export default function TabNavigation(): React.JSX.Element {
    return (
        <Tab.Navigator
            initialRouteName="home-stack-navigator"
            screenOptions={{ headerShown: false }}
            tabBar={(props) => {
                let routeName = getFocusedRouteNameFromRoute(props.state.routes[props.state.index]) ?? props.state.routes[props.state.index].name;
                console.log(routeName)
                return tabBarRoutesName.includes(routeName) ? (
                    <BottomTabNavbar {...props} />
                ) : null;
            }}
        >
            <Tab.Screen name='home-stack-navigator' component={HomeStackNavigator} />
            <Tab.Screen name="accounts-stack-navigator" component={AccountsStackNavigator}  />
            <Tab.Screen name="transition" component={Transition} />
        </Tab.Navigator>
    )
}