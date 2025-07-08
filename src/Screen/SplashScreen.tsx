import { TextTheme } from "../Contexts/ThemeProvider";
import { useEffect } from "react";
import navigator from "../Navigation/NavigationService";
import SafePaddingView from "../components/SafeAreaView/SafePaddingView";
import { Text } from "react-native";

export default function SplashScreen(): React.JSX.Element {

    useEffect(() => {
        setTimeout(() => {
            navigator.replace('tab-navigation')
        }, 1500)
    }, [])

    return (
        <SafePaddingView style={{alignItems: 'center', justifyContent: 'center'}} >
            <TextTheme>Splash Screen</TextTheme>
        </SafePaddingView>
    )
}