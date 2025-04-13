import { StyleSheet, View } from "react-native";
import Home from "./src/screens/Home";
import Navbar from "./src/components/Navbar";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App(): React.JSX.Element {
  
  return (
    <View style={styles.root}>
      <Home />
      <Navbar/>
    </View>
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
