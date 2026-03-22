import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeAreaFromBottom(): React.JSX.Element {
    const {bottom: height} = useSafeAreaInsets();
    return <View style={{width: '100%', height, minHeight: height, maxHeight: height}} />
}