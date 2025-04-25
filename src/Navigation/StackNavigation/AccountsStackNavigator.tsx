import { createStackNavigator } from "@react-navigation/stack";
import TransitionModal from "../../Database/Models/TransitionModal";
import AccountModal from "../../Database/Models/AccountModal";
import Accounts from "../../screens/AccountsScreens/Accounts";
import AccountInfo from "../../screens/AccountsScreens/AccountInfoScreen/AccountInfo";
import CreateTranstion from "../../screens/AccountsScreens/AccountInfoScreen/CreateTransiton";
import UpdateTransition from "../../components/UpdateTransition";


export type AccountStackParamsList = {
    'accounts': undefined
    'account-info': {account: AccountModal},
    'update-transition': {transition: TransitionModal},
    'create-transition': {account: AccountModal, mode: 'income' | 'expense'}
}

const AccountsStack = createStackNavigator<AccountStackParamsList>();

export default function AccountsStackNavigator(): React.JSX.Element {
    return (
        <AccountsStack.Navigator screenOptions={{headerShown: false}}>
            <AccountsStack.Screen name="accounts" component={Accounts} />
            <AccountsStack.Screen name="account-info" component={AccountInfo} />
            <AccountsStack.Screen name="create-transition" component={CreateTranstion} />
            <AccountsStack.Screen name="update-transition" component={UpdateTransition} />
        </AccountsStack.Navigator>
    )
}