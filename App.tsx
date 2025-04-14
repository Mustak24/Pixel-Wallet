import { StyleSheet, View } from "react-native";
import Home from "./src/screens/Home";
import BottomTabNavbar from "./src/components/BottomTabNavbar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accounts from "./src/screens/Accounts";

const Tab = createBottomTabNavigator();


export default function App(): React.JSX.Element {
  
  return (
    <NavigationContainer>
      <View style={styles.root}>
          <Tab.Navigator tabBar={(props) => <BottomTabNavbar {...props} />} screenOptions={{headerShown: false}} >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="accounts" component={Accounts} />
          </Tab.Navigator>
      </View>
    </NavigationContainer>
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
