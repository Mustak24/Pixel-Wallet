import { createStackNavigator } from "@react-navigation/stack";
import TransitionModal from "../../Database/Models/TransitionModal";
import Home from "../../screens/HomeScreens/Home";
import Settings from "../../screens/HomeScreens/SettingsScreen/Settings";
import UpdateTransition from "../../components/UpdateTransition";


export type HomeStackParamsList = {
    'home': undefined
    'update-transition': {transition: TransitionModal},
    'settings': undefined
}

const HomeStack = createStackNavigator<HomeStackParamsList>();

export default function HomeStackNavigator(): React.JSX.Element {
    return (
        <HomeStack.Navigator 
            initialRouteName="home"
            screenOptions={{headerShown: false}}
        >
            <HomeStack.Screen name="home" component={Home} />
            <HomeStack.Screen name="settings" component={Settings} />
            <HomeStack.Screen name="update-transition" component={UpdateTransition} />
        </HomeStack.Navigator>
    )
}