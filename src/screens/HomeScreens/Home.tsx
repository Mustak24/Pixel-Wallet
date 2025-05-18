import { useContext, useEffect, useState} from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AnimateButton from "../../components/Buttons/AnimateButton";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather';
import TransitionCard from "../../components/Cards/TransitionCard";
import TransitionModal from "../../Database/Models/TransitionModal";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import BottomModal from "../../components/Modal/BottomModal";
import { AppContext } from "../../Contexts/AppContext";
import { AppStorage } from "../../Database/Storage";
import TypingText from "../../components/Text/TypingText";
import DateSelectorModal from "../../components/Modal/DateSelectorModal";
import { HomeStackParamsList } from "../../Navigation/StackNavigation/HomeStackNavigator";
import HaveNoTransition from "../../components/HaveNoTransition";
import AccountModal from "../../Database/Models/AccountModal";
import TextTheme from "../../components/Text/TextTheme";
import { ThemeContext } from "../../Contexts/ThemeProvider";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']



export default function Home({ navigation }: BottomTabScreenProps<HomeStackParamsList, 'home'>): React.JSX.Element {

    const {totalBalance, setTotalBalance, username, setUsername} = useContext(AppContext);

    const {primaryColor: color, primaryBackgroundColor: backgroundColor} = useContext(ThemeContext);
    

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [isScrollCloseTop, setScrollCloseTop] = useState<boolean>(true);
    const [transitions, setTransitions] = useState<TransitionModal[]>([]);
    const [transitionsRecord, setTransitionsRecord] = useState<{income: number, expense: number}>({income: 0, expense: 0});

    const [isDateModalVisible, setDateModalVisible] = useState<boolean>(false);
    const [isNameModalVisible, setNameModalVisible] = useState<boolean>(!AppStorage.contains('username'));

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
    }, []);

    useEffect(() => {
        setTransitions(TransitionModal.findByDate(month, year));
        setTransitionsRecord(TransitionModal.getRecordByDate(month, year));
        setTotalBalance(AccountModal.getTotalBalance());
    }, [month, year]);

    return (
        <>
            <View style={[styles.root, {backgroundColor}]}>
                <View style={styles.topHeader}>
                    <View style={{display: 'flex', flexDirection: isScrollCloseTop ? 'row' : 'column'}}>
                        <TextTheme style={{fontSize: isScrollCloseTop ? 16 : 12, fontWeight: '900'}}>
                            {isScrollCloseTop ? 'Hi, ' : 'INR'}
                        </TextTheme>

                        <TextTheme style={{fontSize: 16, fontWeight: '900'}}>
                            {isScrollCloseTop ? username : totalBalance || '0.00'}
                        </TextTheme>
                    </View>

                    <View style={[styles.center, {flexDirection: 'row', gap: 20}]}>
                        <AnimateButton style={styles.topHeader_mounthSelector} onPress={() => setDateModalVisible(true)}>
                            <MaterialIcons name="calendar-today" size={16} color={color} />
                            <TextTheme style={{color, fontWeight: '900', fontSize: 16}}>{months[month]}, {year}</TextTheme>
                        </AnimateButton>

                        <TouchableOpacity onPress={() => navigation.navigate('settings')} style={styles.topHeader_menu}>
                            <MaterialIcons name="settings" color={'white'} size={24}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView onScroll={handleScroll} style={{flex: 1, width: '100%', display: 'flex', paddingInline: 20}} >
                    <View style={{display: 'flex', alignItems: 'flex-start', gap: 20, flexDirection: 'column', width: '100%', marginTop: 32}}>
                        <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'flex-end'}}>
                            <TextTheme style={{fontWeight: '900', fontSize: 24}}>INR:</TextTheme>
                            <TextTheme style={{fontSize: 24, fontWeight: '900'}}>{totalBalance || '0.00'}</TextTheme>
                        </View>

                        <View style={[styles.center, {flexDirection: 'row', gap: 12, position: 'relative'}]}>
                            <Pressable onPress={() => {}} style={{height: 100, backgroundColor: 'rgb(25,200,150)', borderRadius: 20, flex: 1, display: 'flex', padding: 20, gap: 12}}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                    <FeatherIcons name="download" size={24} color={'white'} />
                                    <Text style={{fontWeight: 800, color: 'white'}}>INCOME</Text>
                                </View>

                                <Text style={{fontSize: 22, color: 'white'}}>
                                    <Text style={{fontWeight: 800}}>{transitionsRecord.income || '0.00'}</Text>
                                    <Text> INR</Text>
                                </Text>
                            </Pressable>

                            <View style={{height: 100, backgroundColor: 'gray', borderRadius: 20, flex: 1, display: 'flex', padding: 20, gap: 12}}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                    <FeatherIcons name="upload" size={24} color={'white'} />
                                    <Text style={{fontWeight: 800, color: 'white'}}>EXPENSES</Text>
                                </View>

                                <Text style={{fontSize: 22, color: 'white'}}>
                                    <Text style={{fontWeight: 800}}>{transitionsRecord.expense || '0.00'}</Text>
                                    <Text> INR</Text>
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{borderBottomColor: 'gray', borderWidth: 1, width: '100%', marginBlock: 32, opacity: .5}}></View>

                    <View style={[styles.center, {gap: 20}]}>
                        {transitions.length == 0 ? <HaveNoTransition text="You don't have any transition, You can add by tapping '+' button" /> : null}

                        {
                            transitions.map( (transition) => (
                                    <TransitionCard 
                                        key={transition.id} 
                                        id={transition.id} 
                                        mode={transition.mode} 
                                        fromAccountId={transition.fromAccountId} 
                                        toAccountId={transition.toAccountId}
                                        amount={transition.amount} 
                                        title={transition.title} 
                                        category={transition.category}
                                        description={transition.description} 
                                        createOn={transition.createOn} 
                                        onPress={() => navigation.navigate('update-transition', {transition})}
                                    />
                            ))
                        }
                    </View>
                </ScrollView>

                <DateSelectorModal visible={isDateModalVisible} setVisible={setDateModalVisible} month={month} setMonth={setMonth} year={year} setYear={setYear} />

                <BottomModal 
                    visible={isNameModalVisible} 
                    setVisible={setNameModalVisible} 
                    actionButtons={[{title: 'Save', backgroundColor: 'rgb(25,200,150)', onPress: updateUsername}]}
                    style={{paddingInline: 20, paddingBottom: 150}}
                >
                    <TypingText 
                        text="Welcome" 
                        speed={200}
                        style={{color, fontSize: 18, fontWeight: 900, marginBottom: 20}} 
                    />
                    <TextInput
                        placeholder="Enter Your Name"
                        value={username}
                        onChangeText={setUsername}
                        style={{fontSize: 20, fontWeight: 900, color: color, paddingInline: 2, borderBottomColor: 'gray', borderBottomWidth: 1}}
                        autoFocus={true}
                    />
                </BottomModal>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        paddingTop: 44,
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
        paddingInline: 20,
        paddingBottom: 14
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
        borderWidth: 2,
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