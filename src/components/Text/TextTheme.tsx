import { useContext } from "react";
import { Text, TextProps } from "react-native";
import { AppContext } from "../../Contexts/App";


export default function TextTheme({style, children, numberOfLines}: TextProps): React.JSX.Element {
    const {color} = useContext(AppContext);
    
    return (
        <Text numberOfLines={numberOfLines}  style={[style, {color}]} >{children}</Text>
    )
}