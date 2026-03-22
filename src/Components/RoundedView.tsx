import { StyleSheet, Text, View, ViewStyle } from "react-native";

type RoundedViewProps = {
    children?: React.ReactNode,
    style?: ViewStyle,
    title?: string
    color?: string,
    backgroundColor?: string,
    titleFrontSize?: number,
    titleFrontWidth?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}

export default function RoundedView({children, style={}, title='', color='white', backgroundColor='black', titleFrontSize=12, titleFrontWidth='900'}: RoundedViewProps): React.JSX.Element {
    return (
        <View style={[styles.root, {...style, backgroundColor}]}>
            {children}
            <Text style={{color, fontSize: titleFrontSize, fontWeight: titleFrontWidth}}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        paddingInline: 20,
        height: 44,
        borderRadius: 100
    }
})