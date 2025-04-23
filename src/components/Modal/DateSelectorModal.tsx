import { ScrollView, View } from "react-native";
import BottomModal from "./BottomModal";
import TextTheme from "../Text/TextTheme";
import AnimateButton from "../Buttons/AnimateButton";
import { useState } from "react";

type DateSelectorModalProps = {
    visible: boolean,
    setVisible: (val: boolean) => void,
    month: number,
    setMonth: (mon: number) => void,
    year: number,
    setYear: (y: number) => void
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const years = Array.from({length: new Date().getFullYear() - 2000 + 1}, (_, i) => i + 2000).reverse();

export default function DateSelectorModal({visible, setVisible, month, setMonth, year, setYear}: DateSelectorModalProps): React.JSX.Element {

    const [selMonth, setSelMonth] = useState<number>(month);
    const [selYear, setSelYear] = useState<number>(year);

    return (
        <BottomModal 
            visible={visible} 
            setVisible={setVisible} style={{height: 300}} 
            actionButtons={[
                {
                    title: 'Save', 
                    onPress: () => {
                        setMonth(selMonth);
                        setYear(selYear);
                        setVisible(false);
                    }, 
                    backgroundColor: 'rgb(25,200,150)'}
            ]} 
            onClose={() => {
                setSelMonth(month);
                setSelYear(year);
            }}
        >
            <View>
                <TextTheme style={{fontSize: 20, fontWeight: '900', paddingLeft: 20}}>Select Month</TextTheme>
                <ScrollView 
                    style={{marginTop: 14}} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    ref={(scrollView) => {
                        if (scrollView) {
                            setTimeout(() => {
                                scrollView.scrollTo({ x: selMonth * 80, animated: true });
                            }, 0);
                        }
                    }}
                    >
                    {
                        months.map((monthName, index) => (
                            <AnimateButton key={index} onPress={() => {setSelMonth(index);}} style={{borderRadius: 100, backgroundColor: selMonth == index ? 'rgb(25,200,150)' : 'gray', height: 44, display: 'flex', justifyContent: 'center', alignItems: 'center', marginInline: 10, width: 60}}>
                                <TextTheme style={{color: 'white', fontWeight: '900'}}>{monthName}</TextTheme>
                            </AnimateButton>
                        ))
                    }
                </ScrollView>

                <TextTheme style={{fontSize: 20, fontWeight: '900', paddingLeft: 20, marginTop: 34}}>Select Month</TextTheme>
                <ScrollView
                    style={{marginTop: 14}} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    ref={(scrollView) => {
                        if (scrollView) {
                            setTimeout(() => {
                                scrollView.scrollTo({ x: (years[0] - selYear) * 100, animated: true });
                            }, 0);
                        }
                    }}
                >
                    {
                        years.map((year, index) => (
                            <AnimateButton 
                                key={index} 
                                onPress={() => {
                                    setSelYear(year); 
                                }} 
                                style={{
                                    borderRadius: 100, backgroundColor: year == selYear ? 'rgb(25,200,150)' : 'gray', height: 44, display: 'flex', justifyContent: 'center', marginInline: 10, width: 80, alignItems: 'center'
                                }}
                            >
                                <TextTheme style={{color: 'white', fontWeight: '900'}}>{year}</TextTheme>
                            </AnimateButton>
                        ))
                    }
                </ScrollView>
            </View>
        </BottomModal>
    );
}