import { createStackNavigator } from "@react-navigation/stack";
import TransitionModal from "../../Database/Models/TransitionModal";
import AccountModal from "../../Database/Models/AccountModal";
import Accounts from "../../screens/AccountsScreens/Accounts";
import AccountInfo from "../../screens/AccountsScreens/AccountInfoScreen/AccountInfo";
import CreateTranstion from "../../screens/AccountsScreens/AccountInfoScreen/CreateTransiton";


export type AccountStackParamsList = {
    'accounts': undefined
    'account-info': {account: AccountModal},
    'update-transition': {transition: TransitionModal},
    'create-transition': {account: AccountModal, mode: 'income' | 'expense'}
}

const HomeStack = createStackNavigator<AccountStackParamsList>();

export default function AccountsStackNavigator(): React.JSX.Element {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="accounts" component={Accounts} />
            <HomeStack.Screen name="account-info" component={AccountInfo} />
            <HomeStack.Screen name="create-transition" component={CreateTranstion} />
        </HomeStack.Navigator>
    )
}