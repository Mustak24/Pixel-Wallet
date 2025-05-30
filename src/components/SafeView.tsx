import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeView(){
    const {top: height} = useSafeAreaInsets();
    return <View style={{width: '100%', height, minHeight: height, maxHeight: height}} />
}