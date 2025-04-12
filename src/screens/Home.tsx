import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home(): React.JSX.Element {

    const [isScrollCloseTop, setScrollCloseTop] = useState<Boolean>(true);

    function handleScroll({nativeEvent}: {nativeEvent: {contentOffset: {x: number, y: number}}}): void{
        let isClose: Boolean = (nativeEvent?.contentOffset?.y < 55);
        if(isScrollCloseTop == isClose) return;
        
        setScrollCloseTop(isClose); 
    }
    
    return (
        <View style={styles.home}>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', height: 50}}>
                <View style={{display: 'flex', flexDirection: isScrollCloseTop ? 'row' : 'column'}}>
                    <Text style={{fontSize: isScrollCloseTop ? 16 : 12, color: 'white', fontWeight: '900'}}>
                        {isScrollCloseTop ? 'Hi' : 'INR'},
                    </Text>

                    <Text style={{fontSize: 16, color: 'white', fontWeight: '900'}}>
                        {isScrollCloseTop ? 'Name' : '0.00'}
                    </Text>
                </View>

                <View style={[styles.center, {flexDirection: 'row', gap: 20}]}>
                    <View 
                        style={[styles.center, {borderWidth: 1, borderColor: 'gray', height: 44, borderRadius: 100, paddingInline: 20}]}
                    >
                        <Text style={{color: 'white', fontWeight: '900', fontSize: 16}}>Mounth</Text>
                    </View>

                    <View style={[styles.center, {borderRadius: '50%', height: 44, aspectRatio: 1, backgroundColor: 'gray'}]}>

                    </View>
                </View>
            </View>

            <ScrollView onScroll={handleScroll} style={{flex: 1, width: '100%', display: 'flex'}}>
                <View style={{display: 'flex', alignItems: 'flex-start', gap: 20, flexDirection: 'column', width: '100%', marginTop: 32}}>
                    <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'flex-end'}}>
                        <Text style={{color: 'white', fontWeight: '900', fontSize: 24}}>INR:</Text>
                        <Text style={{fontSize: 24, color: 'white', fontWeight: '900'}}>0.00</Text>
                    </View>

                    <View style={[styles.center, {flexDirection: 'row', gap: 12, position: 'relative'}]}>
                        <View style={{height: 100, backgroundColor: 'lightgreen', borderRadius: 20, flex: 1}}>

                        </View>

                        <View style={{height: 100, backgroundColor: 'gray', borderRadius: 20, flex: 1}}>

                        </View>
                    </View>
                </View>

                <View style={{borderBottomColor: 'gray', borderWidth: 1, width: '100%', marginBlock: 32, opacity: .5}}></View>

                <View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        paddingInline: 20,
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})