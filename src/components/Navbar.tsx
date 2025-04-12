import { StyleSheet, Text, View } from "react-native";

export default function Navbar(): React.JSX.Element {
    return (
        <View style={[styles.navabr, {}]}>
            <Text style={{color: 'white'}}>Home</Text>

            <View style={[styles.center, {position: 'relative', width: 64, aspectRatio: 1, alignSelf: 'flex-start', top: -32, flexDirection: 'row'}]}>
                <View style={[styles.center, {borderTopColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'black', borderWidth: 38, top: -6, borderRadius: 100, borderBottomRightRadius: 100, alignSelf: 'flex-end', position: 'absolute', transform: 'rotate(-45deg)'}]}></View>

                <View style={[styles.center, {position: 'absolute', backgroundColor: 'royalblue', width: 64, aspectRatio: 1, borderRadius: '50%'}]}>
                    <View style={{borderColor: 'white', borderWidth: 1, borderRadius: 10, width: 22, position: 'absolute'}}></View>
                    <View style={{borderColor: 'white', borderWidth: 1, borderRadius: 10, width: 22, position: 'absolute', transform: 'rotate(90deg)'}}></View>
                </View>
            </View>

            <Text style={{color: 'white'}}>ACC</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navabr: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        backgroundColor: 'rgb(25, 25, 25)',
        paddingInline: 32
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
})