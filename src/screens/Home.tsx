import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AnimateButton from "../components/AnimateButton";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather';
import TransitionCard from "../components/TransitionCard";
import TransitionModal from "../Database/Models/TransitionModal";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { stackParamsList } from "../../App";
import AccountModal from "../Database/Models/AccountModal";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Home({ navigation }: BottomTabScreenProps<stackParamsList, 'home'>): React.JSX.Element {

    const [isScrollCloseTop, setScrollCloseTop] = useState<Boolean>(true);
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [transitions, setTransitions] = useState<TransitionModal[]>([]);
    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [transitionRecord, setTransitionRecord] = useState<{income: number, expenses: number}>({income: 0, expenses: 0});

    function handleScroll({nativeEvent}: {nativeEvent: {contentOffset: {x: number, y: number}}}): void{
        let isClose: Boolean = (nativeEvent?.contentOffset?.y < 55);
        if(isScrollCloseTop == isClose) return;
        
        setScrollCloseTop(isClose); 
    }
    
    
    const Name = 'Mustak';

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setScrollCloseTop(true);
            setTransitions(TransitionModal.findByDate(month, year));
            setTotalBalance(AccountModal.getTotalBalance());
            setTransitionRecord(TransitionModal.getRecordByDate(month, year));
        });

        return unsubscribe;
    }, [navigation]);
    
    return (
        <View style={styles.root}>
            <View style={styles.topHeader}>
                <View style={{display: 'flex', flexDirection: isScrollCloseTop ? 'row' : 'column'}}>
                    <Text style={{fontSize: isScrollCloseTop ? 16 : 12, color: 'white', fontWeight: '900'}}>
                        {isScrollCloseTop ? 'Hi, ' : 'INR'}
                    </Text>

                    <Text style={{fontSize: 16, color: 'white', fontWeight: '900'}}>
                        {isScrollCloseTop ? Name : totalBalance || '0.00'}
                    </Text>
                </View>

                <View style={[styles.center, {flexDirection: 'row', gap: 20}]}>
                    <AnimateButton style={styles.topHeader_mounthSelector}>
                        <MaterialIcons name="calendar-today" size={20} color={'white'} />
                        <Text style={{color: 'white', fontWeight: '900', fontSize: 16}}>{months[month]}</Text>
                    </AnimateButton>

                    <View style={styles.topHeader_menu}>
                        <MaterialIcons name="keyboard-arrow-down" color={'white'} size={24}/>
                    </View>
                </View>
            </View>

            <ScrollView onScroll={handleScroll} style={{flex: 1, width: '100%', display: 'flex', paddingInline: 20}} >
                <View style={{display: 'flex', alignItems: 'flex-start', gap: 20, flexDirection: 'column', width: '100%', marginTop: 32}}>
                    <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'flex-end'}}>
                        <Text style={{color: 'white', fontWeight: '900', fontSize: 24}}>INR:</Text>
                        <Text style={{fontSize: 24, color: 'white', fontWeight: '900'}}>{totalBalance || '0.00'}</Text>
                    </View>

                    <View style={[styles.center, {flexDirection: 'row', gap: 12, position: 'relative'}]}>
                        <View style={{height: 100, backgroundColor: 'rgb(25,200,150)', borderRadius: 20, flex: 1, display: 'flex', padding: 20, gap: 12}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <FeatherIcons name="download" size={24} color={'white'} />
                                <Text style={{color: 'white', fontWeight: 800}}>INCOME</Text>
                            </View>

                            <Text style={{color: 'white', fontSize: 22}}>
                                <Text style={{fontWeight: 800}}>{transitionRecord.income || '0.00'}</Text>
                                <Text> INR</Text>
                            </Text>
                        </View>

                        <View style={{height: 100, backgroundColor: 'gray', borderRadius: 20, flex: 1, display: 'flex', padding: 20, gap: 12}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <FeatherIcons name="upload" size={24} color={'white'} />
                                <Text style={{color: 'white', fontWeight: 800}}>EXPENSES</Text>
                            </View>

                            <Text style={{color: 'white', fontSize: 22}}>
                                <Text style={{fontWeight: 800}}>{transitionRecord.expenses || '0.00'}</Text>
                                <Text> INR</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{borderBottomColor: 'gray', borderWidth: 1, width: '100%', marginBlock: 32, opacity: .5}}></View>

                <View style={[styles.center, {gap: 20}]}>
                    {
                        transitions.map( ({id, mode, accountId, amount, title, description, createOn}) => (
                            <TransitionCard 
                                key={id} 
                                id={id} 
                                mode={mode} 
                                accountId={accountId} 
                                amount={amount} 
                                title={title} 
                                description={description} 
                                createOn={createOn} 
                            />
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
        height: 50,
        paddingInline: 20,
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