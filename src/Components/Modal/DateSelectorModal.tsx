/* eslint-disable react-native/no-inline-styles */
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Modal, ModalProps, Pressable, View } from 'react-native';
import { ItemSelectorModal } from './ItemSelectorModal';
import { TextTheme, ThemeView, useTheme } from '../../Contexts/ThemeProvider';
import AnimateButton from '../Buttons/AnimateButton';
import NormalButton from '../Buttons/NormalButton';
import FeatherIcon from '../Icon/FeatherIcon';
import { DateObj, validateDate } from '../../Utils/date-and-time';

type Bounds = { min?: DateObj, max?: DateObj }

type Props = ModalProps & {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    closeOnBack?: boolean
    onClose?: () => void,
    onSelect: (ddmmyy: { year: number, month: number, date: number }) => void,
    value?: DateObj | null,
    bounds?: Bounds
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DateSelectorModal({ visible, setVisible, onClose, closeOnBack = true, onSelect, value, bounds, ...props }: Props): React.JSX.Element {
    const { primaryColor } = useTheme();

    const [date, setDate] = useState<DateObj>(value ?? { year: new Date().getFullYear(), month: new Date().getMonth(), date: new Date().getDate() });

    const [isYearModalVisible, setYearModalVisible] = useState<boolean>(false);

    function incrementMonth(by: number) {
        setDate(pre => validateDate({ ...pre, month: (12 + pre.month + by) % 12, year: pre.year + Math.floor((pre.month + by) / 12) }, bounds));
    }

    useEffect(() => {
        setDate(value ?? { year: new Date().getFullYear(), month: new Date().getMonth(), date: new Date().getDate() });
    }, [value]);

    return (
        <Modal
            {...props}
            visible={visible}
            onRequestClose={() => { setVisible(closeOnBack); if (onClose) { onClose(); } }}
            animationType="fade"
            backdropColor={'rgba(0,0,0,0.5)'}
        >
            <View style={{ width: '100%', height: '100%', padding: 20, alignItems: 'center', justifyContent: 'center' }} >
                <AnimateButton style={{ flex: 1, width: '100%' }} onPress={() => { setVisible(!closeOnBack); }} />

                <ThemeView isPrimary={false} style={{ padding: 12, borderRadius: 10, width: '100%', gap: 12 }} >

                    <TextTheme>Select Date</TextTheme>

                    <TextTheme fontSize={28} fontWeight={900} >
                        {date.date} {monthNames[date.month]}, {date.year}
                    </TextTheme>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingInline: 10, height: 40, borderRadius: 40, borderWidth: 2, borderColor: primaryColor }} >
                        <AnimateButton style={{ borderRadius: 20, padding: 4 }} onPress={() => { incrementMonth(-1); }}>
                            <FeatherIcon name="chevron-left" size={20} />
                        </AnimateButton>

                        <Pressable onPress={() => { setYearModalVisible(true); }} >
                            <TextTheme fontSize={16} fontWeight={900} >{monthNames[date.month]}, {date.year}</TextTheme>
                        </Pressable>

                        <AnimateButton style={{ borderRadius: 20, padding: 4 }} onPress={() => { incrementMonth(1); }}>
                            <FeatherIcon name="chevron-right" size={20} />
                        </AnimateButton>
                    </View>

                    <DisplayCalender date={date} setDate={setDate} bounds={bounds} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }} >
                        <NormalButton
                            isPrimary={false} text="Cancel"
                            onPress={() => { setVisible(false); }}
                        />

                        <NormalButton
                            text="Select"
                            onPress={() => {
                                onSelect(date); setVisible(false);
                            }}
                        />
                    </View>
                </ThemeView>

                <AnimateButton style={{ flex: 1, width: '100%' }} onPress={() => { setVisible(!closeOnBack); }} />
            </View>

            <YearSelectorModal
                visible={isYearModalVisible} setVisible={setYearModalVisible}
                date={date} setDate={setDate}
                bounds={bounds}
            />
        </Modal>
    );
}


type DisplayCalenderProps = {
    date: DateObj,
    setDate: Dispatch<SetStateAction<DateObj>>,
    bounds?: Bounds
}

function DisplayCalender({ date, setDate, bounds }: DisplayCalenderProps): React.JSX.Element {

    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const calenderMat = useMemo(() => {
        const calendar: number[][] = [];

        const firstDay = new Date(date.year, date.month, 1).getDay();
        const totalDays = new Date(date.year, date.month + 1, 0).getDate();

        let currentDay = 1;
        let week: number[] = [];

        for (let i = 0; i < 7; i++) { week.push(i < firstDay ? 0 : currentDay++); }
        calendar.push(week);

        while (currentDay <= totalDays) {
            week = [];
            for (let i = 0; i < 7; i++) { week.push(currentDay <= totalDays ? currentDay++ : 0); }
            calendar.push(week);
        }

        return calendar;
    }, [date.year, date.month]);


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 4 }} >
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }} >
                {
                    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <View key={day} style={{ aspectRatio: 1, width: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}  >
                            <TextTheme isPrimary={false} fontSize={14} fontWeight={900} >{day}</TextTheme>
                        </View>
                    ))
                }
            </View>

            {
                calenderMat.map((week, y) => (
                    <View key={`week-${y}`} style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }} >
                        {
                            week.map((dd, x) => (
                                <ThemeView
                                    key={`day-${y}-${x}`}
                                    isPrimary={currentDate === dd && currentMonth === date.month && currentYear === date.year}
                                    backgroundColor={dd === date.date ? 'rgb(50,100,200)' : ''}
                                    style={{ borderRadius: 8, overflow: 'hidden' }}
                                >
                                    <AnimateButton
                                        bubbleScale={3}
                                        onPress={() => setDate(pre => validateDate({ ...pre, date: dd }, bounds))}
                                        style={{ alignItems: 'center', justifyContent: 'center', aspectRatio: 1, width: 40 }}
                                    >
                                        <TextTheme
                                            color={dd === date.date ? 'white' : ''}
                                            fontSize={14} fontWeight={900}
                                        >
                                            {dd === 0 ? null : dd}
                                        </TextTheme>
                                    </AnimateButton>
                                </ThemeView>
                            ))
                        }
                    </View>
                ))
            }
        </View>
    );
}

type Year = { year: number, month: number }

type YearSelectorModalProps = {
    visible: boolean, setVisible: Dispatch<SetStateAction<boolean>>,
    date: DateObj, setDate: Dispatch<SetStateAction<DateObj>>,
    bounds?: Bounds
}

function YearSelectorModal({ visible, setVisible, date, setDate, bounds }: YearSelectorModalProps): React.JSX.Element {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const years: number[] = Array.from({ length: 20 }, (_, i) => currentYear - i);

    const data: Year[] = useMemo(() => {
        let data: Year[] = [];
        for (let year of years) {
            for (let month = 11; month >= 0; month--) {
                if (currentMonth >= month || currentYear > year) { data.push({ year, month }); }
            }
        }
        return data;
    }, []);

    return (
        <ItemSelectorModal
            allItems={data}
            isItemSelected={!!date.year}
            visible={visible} setVisible={setVisible}
            onSelect={item => { setDate(pre => validateDate({ ...pre, year: item.year, month: item.month }, bounds)); }}
            keyExtractor={item => (item.year * 100 + item.month).toString()}
            SelectedItemContent={
                <TextTheme fontWeight={600} color="white" >{monthNames[date.month]} {date.date}, {date.year}</TextTheme>
            }

            renderItemContent={item => (<>
                <TextTheme isPrimary={item.year === date.year && item.month == date.month} fontSize={20} fontWeight={900} >
                    {monthNames[item.month]} {date.date}
                </TextTheme>
                <TextTheme isPrimary={item.year === date.year && item.month == date.month} fontSize={20} fontWeight={900} >
                    {item.year}
                </TextTheme>
            </>)}

            filter={(item, val) => (
                item.year.toString().startsWith(val) ||
                item.year.toString().endsWith(val) ||
                monthNames[item.month].toLowerCase().startsWith(val)
            )}
            title="Select Year"
        />
    );
}