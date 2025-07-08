import { Dimensions, View, ViewProps, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../Contexts/ThemeProvider";

type Props = ViewProps & {
    style?: ViewStyle,
    fromTop?: boolean,
    fromBottom?: boolean,
    backgroundColor?: string,
    isPrimary?: boolean
}

export default function SafePaddingView({style, backgroundColor, isPrimary=true, fromTop=true, fromBottom=true, ...props}: Props) {
    
    const {top, bottom} = useSafeAreaInsets();
    const {primaryBackgroundColor, secondaryBackgroundColor} = useTheme();
    const {width, height} = Dimensions.get('window')

    if(!backgroundColor) {
        backgroundColor = isPrimary ? primaryBackgroundColor : secondaryBackgroundColor;
    }

    return (
        <View {...props} style={[style, {paddingTop: fromTop ? top : 0, paddingBottom: fromBottom ? bottom : 0, backgroundColor, height, width}]} />
    )
}