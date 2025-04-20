import { useContext, useEffect, useState, createContext, Dispatch, SetStateAction } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AnimateButton from "../components/AnimateButton";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather';
import TransitionCard from "../components/TransitionCard";
import TransitionModal from "../Database/Models/TransitionModal";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { stackParamsList } from "../../App";
import BottomModal from "../components/BottomModal";
import { AppContext } from "../Contexts/App";
import { AppStorage } from "../Database/Storage";
import TypingText from "../components/TypingText";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const years = Array.from({length: new Date().getFullYear() - 2000 + 1}, (_, i) => i + 2000).reverse();


type AppContextType = {
    month: number,
    setMonth: Dispatch<SetStateAction<number>>,
    
    year: number,
    setYear: Dispatch<SetStateAction<number>>,

    transitions: TransitionModal[],
    setTransitions: Dispatch<SetStateAction<TransitionModal[]>>,
    
    transitionsRecord: {income: number, expenses: number},
    setTransitionsRecord: Dispatch<SetStateAction<{income: number, expenses: number}>>,
    
}

const defaultState: AppContextType = {
    month: 0, setMonth: ()=>{},
    year: 0, setYear: ()=>{},
    transitions: [], setTransitions: ()=>{},
    transitionsRecord: {income: 0, expenses: 0}, setTransitionsRecord: ()=>{}
}


export const HomeContext = createContext<AppContextType>(defaultState);

export default function Home({ navigation }: BottomTabScreenProps<stackParamsList, 'home'>): React.JSX.Element {

    const {totalBalance} = useContext(AppContext);

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [isScrollCloseTop, setScrollCloseTop] = useState<boolean>(true);
    const [transitions, setTransitions] = useState<TransitionModal[]>([]);
    const [transitionsRecord, setTransitionsRecord] = useState<{income: number, expenses: number}>({income: 0, expenses: 0});

    const [isDateModalVisible, setDateModalVisible] = useState<boolean>(false);
    const [isNameModalVisible, setNameModalVisible] = useState<boolean>(!AppStorage.contains('username'));

    const [username, setUsername] = useState<string>(isNameModalVisible ? "" : AppStorage.getString('username') ?? 'Hii');

    function handleScroll({nativeEvent}: {nativeEvent: {contentOffset: {x: number, y: number}}}): void{
        let isClose: boolean = (nativeEvent?.contentOffset?.y < 55);
        if(isScrollCloseTop === isClose) return;
        
        setScrollCloseTop(isClose);
    }

    function updateUsername() {
        if(!username) return;
        AppStorage.set('username', username);
        setNameModalVisible(false);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setScrollCloseTop(true);
            setTransitions(TransitionModal.findByDate(month, year));
            setTransitionsRecord(TransitionModal.getRecordByDate(month, year));
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        setTransitions(TransitionModal.findByDate(month, year));
        setTransitionsRecord(TransitionModal.getRecordByDate(month, year));
    }, [month, year]);


    const states: AppContextType = {
        month, setMonth,
        year, setYear,
        transitions, setTransitions,
        transitionsRecord, setTransitionsRecord
    }
    
    return (
        <HomeContext.Provider value={states}>
            <View style={styles.root}>
                <View style={styles.topHeader}>
                    <View style={{display: 'flex', flexDirection: isScrollCloseTop ? 'row' : 'column'}}>
                        <Text style={{fontSize: isScrollCloseTop ? 16 : 12, color: 'white', fontWeight: '900'}}>
                            {isScrollCloseTop ? 'Hi, ' : 'INR'}
                        </Text>

                        <Text style={{fontSize: 16, color: 'white', fontWeight: '900'}}>
                            {isScrollCloseTop ? username : totalBalance || '0.00'}
                        </Text>
                    </View>

                    <View style={[styles.center, {flexDirection: 'row', gap: 20}]}>
                        <AnimateButton style={styles.topHeader_mounthSelector} onPress={() => setDateModalVisible(true)}>
                            <MaterialIcons name="calendar-today" size={16} color={'white'} />
                            <Text style={{color: 'white', fontWeight: '900', fontSize: 16}}>{months[month]}, {year}</Text>
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
                                    <Text style={{fontWeight: 800}}>{transitionsRecord.income || '0.00'}</Text>
                                    <Text> INR</Text>
                                </Text>
                            </View>

                            <View style={{height: 100, backgroundColor: 'gray', borderRadius: 20, flex: 1, display: 'flex', padding: 20, gap: 12}}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                    <FeatherIcons name="upload" size={24} color={'white'} />
                                    <Text style={{color: 'white', fontWeight: 800}}>EXPENSES</Text>
                                </View>

                                <Text style={{color: 'white', fontSize: 22}}>
                                    <Text style={{fontWeight: 800}}>{transitionsRecord.expenses || '0.00'}</Text>
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

                <BottomModal 
                    visible={isDateModalVisible} 
                    setVisible={setDateModalVisible} style={{height: 300}} 
                    actionButtons={[{title: 'Save', onPress: () => setDateModalVisible(false), backgroundColor: 'rgb(25,200,150)'}]} 
                    >
                    <View>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: '900', paddingLeft: 20}}>Select Month</Text>
                        <ScrollView 
                            style={{marginTop: 14}} 
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false} 
                            ref={(scrollView) => {
                                if (scrollView) {
                                    setTimeout(() => {
                                        scrollView.scrollTo({ x: month * 80, animated: true });
                                    }, 0);
                                }
                            }}
                            >
                            {
                                months.map((monthName, index) => (
                                    <AnimateButton key={index} onPress={() => {setMonth(index); setDateModalVisible(false)}} style={{borderRadius: 100, backgroundColor: month == index ? 'rgb(25,200,150)' : 'gray', height: 44, display: 'flex', justifyContent: 'center', alignItems: 'center', marginInline: 10, width: 60}}>
                                        <Text style={{color: 'white', fontWeight: '900'}}>{monthName}</Text>
                                    </AnimateButton>
                                ))
                            }
                        </ScrollView>

                        <Text style={{color: 'white', fontSize: 20, fontWeight: '900', paddingLeft: 20, marginTop: 34}}>Select Month</Text>
                        <ScrollView 
                            style={{marginTop: 14}} 
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false}
                            ref={(scrollView) => {
                                if (scrollView) {
                                    setTimeout(() => {
                                        scrollView.scrollTo({ x: (years[0] - year) * 100, animated: true });
                                    }, 0);
                                }
                            }}
                            >
                            {
                                years.map((y, index) => (
                                    <AnimateButton key={index} onPress={() => {setYear(y); setDateModalVisible(false)}} style={{borderRadius: 100, backgroundColor: y == year ? 'rgb(25,200,150)' : 'gray', height: 44, display: 'flex', justifyContent: 'center', marginInline: 10, width: 80, alignItems: 'center'}}>
                                        <Text style={{color: 'white', fontWeight: '900'}}>{y}</Text>
                                    </AnimateButton>
                                ))
                            }
                        </ScrollView>
                    </View>
                </BottomModal>

                <BottomModal 
                    visible={isNameModalVisible} 
                    setVisible={setNameModalVisible} 
                    actionButtons={[{title: 'Save', backgroundColor: 'rgb(25,200,150)', onPress: updateUsername}]}
                    style={{paddingInline: 20, paddingBottom: 150}}
                >
                    <TypingText 
                        text="Welcome" 
                        speed={200}
                        style={{color: 'white', fontSize: 18, fontWeight: 900, marginBottom: 20}} 
                    />
                    <TextInput
                        placeholder="Enter Your Name"
                        value={username}
                        onChangeText={setUsername}
                        style={{fontSize: 20, fontWeight: 900, color: 'white', paddingInline: 2, borderBottomColor: 'gray', borderBottomWidth: 1}}
                        autoFocus={true}
                    />
                </BottomModal>
            </View>
        </HomeContext.Provider>
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