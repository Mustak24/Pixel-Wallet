import { View } from "react-native";
import style from '../../AppStyle'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useContext } from "react";
import TextTheme from "./Text/TextTheme";
import { ThemeContext } from "../Contexts/ThemeProvider";

export default function HaveNoTransition({text="You don't have any transition."}:{text?: string}): React.JSX.Element {
    const {primaryColor: color} = useContext(ThemeContext);

    return (
        <View style={[style.center, style.width100, {padding: 30, opacity: 0.6}]}>
            <FeatherIcons name="inbox" size={38} color={color} />
            <TextTheme style={{color, fontWeight: '900', fontSize: 18, marginTop: 10, marginBottom: 4}}>No Transitions</TextTheme>
            <TextTheme style={{color, fontWeight: '800', fontSize: 12, textAlign: 'center', opacity: 0.75}}>{text}</TextTheme>
        </View>
    )
}