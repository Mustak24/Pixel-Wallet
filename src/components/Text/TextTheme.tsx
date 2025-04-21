import { useContext } from "react";
import { Text, TextStyle } from "react-native";
import { AppContext } from "../../Contexts/App";

export default function TextTheme({children, style={}}: {children: React.ReactNode, style?: TextStyle}): React.JSX.Element {
    const {color} = useContext(AppContext);
    
    return (
        <Text style={[{color}, style]}>{children}</Text>
    )
}