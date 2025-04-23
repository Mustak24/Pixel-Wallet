import { createStackNavigator } from "@react-navigation/stack";
import TransitionModal from "../../Database/Models/TransitionModal";
import Home from "../../screens/HomeScreens/Home";


export type HomeStackParamsList = {
    'home': undefined
    'update-transition': {transition: TransitionModal},
}

const HomeStack = createStackNavigator<HomeStackParamsList>();

export default function HomeStackNavigator(): React.JSX.Element {
    return (
        <HomeStack.Navigator 
            initialRouteName="home"
            screenOptions={{headerShown: false}}
        >
            <HomeStack.Screen name="home" component={Home} />
            {/* <HomeStack.Screen name="update-transition" component={UpdateTransition} /> */}
        </HomeStack.Navigator>
    )
}