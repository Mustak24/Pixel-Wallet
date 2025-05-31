import { Text, TextProps } from "react-native";
import { useTheme } from "../../Contexts/ThemeProvider";


export default function TextTheme({style, children, numberOfLines}: TextProps): React.JSX.Element {
    const {primaryColor: color} = useTheme();
    
    return (
        <Text numberOfLines={numberOfLines}  style={[style, {color}]} >{children}</Text>
    )
}