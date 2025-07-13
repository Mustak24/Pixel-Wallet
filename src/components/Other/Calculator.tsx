import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Feathericons from 'react-native-vector-icons/Feather';
import { TextTheme } from "../../Contexts/ThemeProvider";
import AnimateButton from "../Buttons/AnimateButton";
import { useAppContext } from "../../Contexts/AppContext";

type CalculatorProps = {
    value?: number
    onChangeValue?: (value: string) => any,
    onResult?: (value: number) => any,
}

type buttonObject = {
    onPress: () => any,
    innerText: React.ReactNode | string,
    textColor: 'crimson' | 'white',
}


export default function Calculator({onChangeValue=()=>{}, value: val = 0, onResult=()=>{}}: CalculatorProps): React.JSX.Element {

    const {currency} = useAppContext()
    const [value, setValue] = useState<string>(String(val || ''));

    const buttons = useRef<buttonObject[][]>([
        [
            {onPress: deleteAllText, innerText: 'C', textColor: 'crimson'},
            {onPress: () => writeText('('), innerText: '(', textColor: 'white'},
            {onPress: () => writeText(')'), innerText: ')', textColor: 'white'},
            {onPress: () => writeText('/'), innerText: '÷', textColor: 'white'},
        ],
        [
            {onPress: () => writeText('7'), innerText: '7', textColor: 'white'},
            {onPress: () => writeText('8'), innerText: '8', textColor: 'white'},
            {onPress: () => writeText('9'), innerText: '9', textColor: 'white'},
            {onPress: () => writeText('×'), innerText: '×', textColor: 'white'},
        ],
        [
            {onPress: () => writeText('4'), innerText: '4', textColor: 'white'},
            {onPress: () => writeText('5'), innerText: '5', textColor: 'white'},
            {onPress: () => writeText('6'), innerText: '6', textColor: 'white'},
            {onPress: () => writeText('-'), innerText: '-', textColor: 'white'},
        ],
        [
            {onPress: () => writeText('1'), innerText: '1', textColor: 'white'},
            {onPress: () => writeText('2'), innerText: '2', textColor: 'white'},
            {onPress: () => writeText('3'), innerText: '3', textColor: 'white'},
            {onPress: () => writeText('+'), innerText: '+', textColor: 'white'},
        ],
        [
            {onPress: () => writeText('.'), innerText: '.', textColor: 'white'},
            {onPress: () => writeText('0'), innerText: '0', textColor: 'white'},
            {onPress: calculate, innerText: '=', textColor: 'white'},
            {onPress: deleteText, innerText: <Feathericons name='delete' size={18} color={'crimson'} />, textColor: 'crimson'},
        ]
    ]).current;


    function writeText(text: string): void { setValue(value => value + text) }

    function deleteText(): void { setValue(value => value.slice(0, value.length-1)) }

    function deleteAllText(): void { setValue('') }

    function calculate(): void{
        try {   
            let expesion: string = '';
            
            setValue(value => {
                expesion = value.replaceAll('×', '*');
                return value;
            });
            
            let result = String(eval(expesion))
            setValue(result);
        } catch(e) {
            setValue('NULL');
        }
    }

    function isResult(): Boolean{
        for(let char of value){
            if('()/×-+NULL'.includes(char)) return false;
        }
        return true;
    }

    useEffect(() => {
        if(isResult()) onResult(Number(value))
        onChangeValue(value)
    }, [value])

    return (
        <View style={styles.root}>
            <TextTheme style={styles.resultScreen}>
                <Text>{value || '0.00'}</Text>
                {isResult() && <Text> {currency}</Text>}
            </TextTheme>

            <View style={styles.buttonBox}>
                <View style={styles.buttonBox_colums}>
                    {
                        buttons.map((row, index) => (
                            <View key={index + 'row'} style={styles.buttonBox_rows}>
                                {
                                    row.map(({onPress, innerText, textColor}, col) => (
                                        <AnimateButton
                                            key={index +" "+ col} 
                                            style={styles.button}
                                            onPress={onPress} 
                                        >
                                            <TextTheme style={{color: textColor, fontWeight: 900, fontSize: 18}} >
                                               {innerText}
                                            </TextTheme>
                                        </AnimateButton>
                                    ))
                                }
                            </View>
                        ))
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },

    resultScreen: {
        fontSize: 18,
        fontWeight: 900
    },

    buttonBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonBox_colums: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

    buttonBox_rows: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    button: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'gray',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    }

})