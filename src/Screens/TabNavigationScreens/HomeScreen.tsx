import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import SafePaddingView from "../../Components/SafeAreaView/SafePaddingView";
import { useAppContext } from "../../Contexts/AppContext";
import { TextTheme, useTheme } from "../../Contexts/ThemeProvider";
import { useEffect, useState } from "react";
import TransactionModal from "../../Database/Models/TransactionModal";
import { AppStorage } from "../../Database/Storage";
import AccountModal from "../../Database/Models/AccountModal";
import AnimateButton from "../../Components/Buttons/AnimateButton";
import MaterialIcon from "../../Components/Icon/MaterialIcon";
import FeatherIcon from "../../Components/Icon/FeatherIcon";
import HaveNoTransaction from "../../Components/Other/HaveNoTransaction";
import TransactionCard from "../../Components/Cards/TransactionCard";
import MonthSelectorModal from "../../Components/Modal/MonthSelectorModal";
import BottomModal from "../../Components/Modal/BottomModal";
import TypingText from "../../Components/Text/TypingText";
import navigator from "../../Navigation/NavigationService";



const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function HomeScreen(): React.JSX.Element {

    const { totalBalance, setTotalBalance, username, setUsername, isNeedTransactionRefresh, currency } = useAppContext();

    const { primaryColor: color, primaryBackgroundColor: backgroundColor } = useTheme();


    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [isScrollCloseTop, setScrollCloseTop] = useState<boolean>(true);
    const [transactions, setTransactions] = useState<TransactionModal[]>([]);
    const [transitionsRecord, setTransactionsRecord] = useState<{ income: number, expense: number }>({ income: 0, expense: 0 });

    const [isDateModalVisible, setDateModalVisible] = useState<boolean>(false);
    const [isNameModalVisible, setNameModalVisible] = useState<boolean>(!AppStorage.contains('username'));

    function handleScroll({ nativeEvent }: { nativeEvent: { contentOffset: { x: number, y: number } } }): void {
        let isClose: boolean = (nativeEvent?.contentOffset?.y < 55);
        if (isScrollCloseTop === isClose) return;

        setScrollCloseTop(isClose);
    }

    function updateUsername() {
        if (!username) return;
        AppStorage.set('username', username);
        setNameModalVisible(false);
    }


    useEffect(() => {
        setTransactions(TransactionModal.findByDate(month, year));
        setTransactionsRecord(TransactionModal.getRecordByDate(month, year));
        setTotalBalance(AccountModal.getTotalBalance());
    }, [month, year, isNeedTransactionRefresh]);

    return (
        <SafePaddingView fromBottom={false} >
            <View style={styles.topHeader}>
                <View style={{ display: 'flex', flexDirection: isScrollCloseTop ? 'row' : 'column' }}>
                    <TextTheme style={{ fontSize: isScrollCloseTop ? 16 : 12, fontWeight: '900' }}>
                        {isScrollCloseTop ? 'Hi, ' : '{currency}'}
                    </TextTheme>

                    <TextTheme style={{ fontSize: 16, fontWeight: '900' }}>
                        {isScrollCloseTop ? username : totalBalance || '0.00'}
                    </TextTheme>
                </View>

                <View style={[styles.center, { flexDirection: 'row', gap: 20 }]}>
                    <AnimateButton style={styles.topHeader_mounthSelector} onPress={() => setDateModalVisible(true)}>
                        <MaterialIcon name="calendar-today" size={16} color={color} />
                        <TextTheme style={{ color, fontWeight: '900', fontSize: 16 }}>{months[month]}, {year}</TextTheme>
                    </AnimateButton>

                    <AnimateButton onPress={() => navigator.navigate('setting-screen')} style={styles.topHeader_menu}>
                        <MaterialIcon name="settings" color={'white'} size={24} />
                    </AnimateButton>
                </View>
            </View>

            <ScrollView onScroll={handleScroll} style={{ flex: 1, width: '100%', display: 'flex', paddingInline: 20 }} >
                <View style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexDirection: 'column', width: '100%', marginTop: 32 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'flex-end' }}>
                        <TextTheme style={{ fontWeight: '900', fontSize: 24 }}>{currency}:</TextTheme>
                        <TextTheme style={{ fontSize: 24, fontWeight: '900' }}>{totalBalance || '0.00'}</TextTheme>
                    </View>

                    <View style={[styles.center, { flexDirection: 'row', gap: 12, position: 'relative' }]}>
                        <AnimateButton onPress={() => { }} style={{ height: 100, backgroundColor: 'rgb(25,200,150)', borderRadius: 20, flex: 1, display: 'flex', padding: 20, gap: 12 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <FeatherIcon name="download" size={24} color={'white'} />
                                <Text style={{ fontWeight: 800, color: 'white' }}>INCOME</Text>
                            </View>

                            <Text style={{ fontSize: 22, color: 'white' }}>
                                <Text style={{ fontWeight: 800 }}>{transitionsRecord.income || '0.00'}</Text>
                                <Text> {currency}</Text>
                            </Text>
                        </AnimateButton>

                        <View style={{ height: 100, backgroundColor: 'gray', borderRadius: 20, flex: 1, display: 'flex', padding: 20, gap: 12 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <FeatherIcon name="upload" size={24} color={'white'} />
                                <Text style={{ fontWeight: 800, color: 'white' }}>EXPENSES</Text>
                            </View>

                            <Text style={{ fontSize: 22, color: 'white' }}>
                                <Text style={{ fontWeight: 800 }}>{transitionsRecord.expense || '0.00'}</Text>
                                <Text> {currency}</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ borderBottomColor: 'gray', borderWidth: 1, width: '100%', marginBlock: 32, opacity: .5 }}></View>

                <View style={[styles.center, { gap: 20 }]}>
                    {transactions.length == 0 ? <HaveNoTransaction text="You don't have any transaction, You can add by tapping '+' button" /> : null}

                    {
                        transactions.map((transaction) => (
                            <TransactionCard
                                key={transaction.id}
                                id={transaction.id}
                                mode={transaction.mode}
                                fromAccountId={transaction.fromAccountId}
                                toAccountId={transaction.toAccountId}
                                amount={transaction.amount}
                                title={transaction.title}
                                category={transaction.category}
                                description={transaction.description}
                                createOn={transaction.createOn}
                                onPress={() => navigator.navigate('transaction-update-screen', { transaction })}
                            />
                        ))
                    }
                </View>
            </ScrollView>

            <MonthSelectorModal visible={isDateModalVisible} setVisible={setDateModalVisible} month={month} setMonth={setMonth} year={year} setYear={setYear} />

            <BottomModal
                visible={isNameModalVisible}
                setVisible={setNameModalVisible}
                actionButtons={[{ title: 'Save', backgroundColor: 'rgb(25,200,150)', onPress: updateUsername }]}
                style={{ paddingInline: 20, paddingBottom: 150 }}
            >
                <TypingText
                    text="Welcome"
                    speed={200}
                    style={{ color, fontSize: 18, fontWeight: 900, marginBottom: 20 }}
                />
                <TextInput
                    placeholder="Enter Your Name"
                    placeholderTextColor={color}
                    value={username}
                    onChangeText={setUsername}
                    style={{ fontSize: 20, fontWeight: 900, color, paddingInline: 2, borderBottomColor: 'gray', borderBottomWidth: 1, opacity: username ? 1 : 0.5 }}
                    autoFocus={true}
                />
            </BottomModal>
        </SafePaddingView>
    )
}



const styles = StyleSheet.create({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        flex: 1
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
        paddingBottom: 14,
        marginTop: 10,
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