import { useContext } from "react";
import { Text, TextProps } from "react-native";
import { ThemeContext } from "../../Contexts/ThemeProvider";


export default function TextTheme({style, children, numberOfLines}: TextProps): React.JSX.Element {
    const {primaryColor: color} = useContext(ThemeContext);
    
    return (
        <Text numberOfLines={numberOfLines}  style={[style, {color}]} >{children}</Text>
    )
}