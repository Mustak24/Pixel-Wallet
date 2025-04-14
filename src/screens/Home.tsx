import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AnimateButton from "../components/AnimateButton";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather';
import TransitionCard from "../components/TransitionCard";
import Transition from "../Database/Models/Transition";
import Storage from "../Database/Storage";

export default function Home(): React.JSX.Element {

    const [isScrollCloseTop, setScrollCloseTop] = useState<Boolean>(true);

    function handleScroll({nativeEvent}: {nativeEvent: {contentOffset: {x: number, y: number}}}): void{
        let isClose: Boolean = (nativeEvent?.contentOffset?.y < 55);
        if(isScrollCloseTop == isClose) return;
        
        setScrollCloseTop(isClose); 
    }
    
    const TranstionData = useRef<Transition[]>(Transition.getAll()).current;
    const Name = useRef(Storage.getString('name')).current;
    
    return (
        <View style={styles.root}>
            <View style={styles.topHeader}>
                <View style={{display: 'flex', flexDirection: isScrollCloseTop ? 'row' : 'column'}}>
                    <Text style={{fontSize: isScrollCloseTop ? 16 : 12, color: 'white', fontWeight: '900'}}>
                        {isScrollCloseTop ? 'Hi' : 'INR'},
                    </Text>

                    <Text style={{fontSize: 16, color: 'white', fontWeight: '900'}}>
                        {isScrollCloseTop ? Name : '0.00'}
                    </Text>
                </View>

                <View style={[styles.center, {flexDirection: 'row', gap: 20}]}>
                    <AnimateButton style={styles.topHeader_mounthSelector}>
                        <MaterialIcons name="calendar-today" size={20} color={'white'} />
                        <Text style={{color: 'white', fontWeight: '900', fontSize: 16}}>Mounth</Text>
                    </AnimateButton>

                    <View style={styles.topHeader_menu}>
                        <MaterialIcons name="keyboard-arrow-down" color={'white'} size={24}/>
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
                        <View style={{height: 100, backgroundColor: 'rgb(25,200,150)', borderRadius: 20, flex: 1, display: 'flex', padding: 20, gap: 12}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <FeatherIcons name="download" size={24} color={'white'} />
                                <Text style={{color: 'white', fontWeight: 800}}>INCOME</Text>
                            </View>

                            <Text style={{color: 'white', fontSize: 22}}>
                                <Text style={{fontWeight: 800}}>120</Text>
                                <Text> INR</Text>
                            </Text>
                        </View>

                        <View style={{height: 100, backgroundColor: 'gray', borderRadius: 20, flex: 1, display: 'flex', padding: 20, gap: 12}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <FeatherIcons name="upload" size={24} color={'white'} />
                                <Text style={{color: 'white', fontWeight: 800}}>EXPENSES</Text>
                            </View>

                            <Text style={{color: 'white', fontSize: 22}}>
                                <Text style={{fontWeight: 800}}>120</Text>
                                <Text> INR</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{borderBottomColor: 'gray', borderWidth: 1, width: '100%', marginBlock: 32, opacity: .5}}></View>

                <View>
                    {
                        TranstionData.map(({type, accountId, title, description}) => (
                            <TransitionCard type={type} date="JUNE 14" time="12:32" mode={accountId} title={title} description={description} />
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        paddingInline: 20,
        backgroundColor: 'black'
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    topHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 50
    },

    topHeader_mounthSelector: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        paddingInline: 20,
        height: 44,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'gray'
    },

    topHeader_menu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 1000,
        backgroundColor: 'gray'
    }
})