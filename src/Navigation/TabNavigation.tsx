import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/TabNavigationScreens/HomeScreen";
import AccountScreen from "../Screens/TabNavigationScreens/AccountScreens/AccountScreen";
import BottomTabNavbar from "../Components/BottomTabNavbar";


export type TabParamsList = {
    'home-screen': undefined,
    'account-screen': undefined
}

const Tab = createBottomTabNavigator<TabParamsList>();

export default function TabNavigation(): React.JSX.Element {
    return (
        <Tab.Navigator
            initialRouteName="home-screen"
            screenOptions={{ headerShown: false, tabBarStyle:{display: 'none'}, animation: 'shift'}}
            tabBar={(props) => (
                <BottomTabNavbar {...props} />
            )}
        >
            <Tab.Screen name='home-screen' component={HomeScreen} />
            <Tab.Screen name="account-screen" component={AccountScreen}  />
        </Tab.Navigator>
    )
}