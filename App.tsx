import AppContextProvider from "./src/Contexts/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeProvider from "./src/Contexts/ThemeProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AlertProvider from "./src/components/Alert/AlertProvider";
import AlertCard from "./src/components/Alert/AlertCard";
import RootNavitaion from "./src/Navigation/RootNavigation";

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <AppContextProvider>
          <ThemeProvider>
            <AlertProvider>
              <AlertCard />
              <RootNavitaion/>
            </AlertProvider>
          </ThemeProvider>
        </AppContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

