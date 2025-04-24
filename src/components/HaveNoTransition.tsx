import { View } from "react-native";
import style from '../../AppStyle'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useContext } from "react";
import { AppContext } from "../Contexts/App";
import { Text } from "react-native-gesture-handler";

export default function HaveNoTransition(): React.JSX.Element {
    const {color} = useContext(AppContext);

    return (
        <View style={[style.center, style.width100, {padding: 30, opacity: 0.6}]}>
            <FeatherIcons name="inbox" size={38} color={color} />
            <Text style={{color, fontWeight: '900', fontSize: 18, marginTop: 10, marginBottom: 4}}>No Transitions</Text>
            <Text style={{color, fontWeight: '800', fontSize: 12, textAlign: 'center', opacity: 0.75}}>You don't have any transition, You can add by tapping '+' button</Text>
        </View>
    )
}