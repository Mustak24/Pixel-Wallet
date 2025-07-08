import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { AppStorage } from "../Database/Storage"
import { Text, TextProps, TextStyle, View, ViewProps, ViewStyle } from "react-native"



type ThemeContextType = {
    theme: 'light' | 'dark',
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>,

    primaryColor: string,
    setPrimaryColor: Dispatch<SetStateAction<string>>,

    secondaryColor: string,
    setSecondaryColor: Dispatch<SetStateAction<string>>,

    primaryBackgroundColor: string, 
    setPrimaryBackgroundColor: Dispatch<SetStateAction<string>>,

    secondaryBackgroundColor: string, 
    setSecondaryBackgroundColor: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light', setTheme: () => {},
    primaryColor: '', setPrimaryColor: () => {},
    secondaryColor: '', setSecondaryColor: () => {},
    primaryBackgroundColor: '', setPrimaryBackgroundColor: () => {},
    secondaryBackgroundColor: '', setSecondaryBackgroundColor: () => {}
})



type ThemeColors = {
    primaryColor: string,
    secondaryColor: string,
    primaryBackgroundColor: string,
    secondaryBackgroundColor: string
}

const themeColors: {
    light: ThemeColors,
    dark: ThemeColors
} = {
    light: {
        primaryColor: 'black',
        secondaryColor: 'rgb(50,50,50)',
        primaryBackgroundColor: 'white',
        secondaryBackgroundColor: 'rgb(220,220,220)'
    },
    dark: {
        primaryColor: 'white',
        secondaryColor: 'rgb(220,220,220)',
        primaryBackgroundColor: 'black',
        secondaryBackgroundColor: 'rgb(30,30,30)'
    }
}

export default function ThemeProvider ({children}: {children: React.ReactNode}): React.JSX.Element {
    
    const appTheme: 'light' | 'dark' = AppStorage.getString('theme') == 'light' ? 'light' : 'dark';

    const [theme, setTheme] = useState<'light' | 'dark'>(appTheme);
    const [primaryColor, setPrimaryColor] = useState<string>(themeColors[appTheme]['primaryColor']);
    const [secondaryColor, setSecondaryColor] = useState<string>(themeColors[appTheme]['secondaryColor']);
    const [primaryBackgroundColor, setPrimaryBackgroundColor] = useState<string>(themeColors[appTheme]['primaryBackgroundColor']);
    const [secondaryBackgroundColor, setSecondaryBackgroundColor] = useState<string>(themeColors[appTheme]['secondaryBackgroundColor']);

    useEffect(() => {
        AppStorage.set('theme', theme);
        setPrimaryColor(themeColors[theme]['primaryColor']);
        setSecondaryColor(themeColors[theme]['secondaryColor']);
        setPrimaryBackgroundColor(themeColors[theme]['primaryBackgroundColor']);
        setSecondaryBackgroundColor(themeColors[theme]['secondaryBackgroundColor']);
    }, [theme])

    const states = {
        theme, setTheme,
        primaryColor, setPrimaryColor,
        secondaryColor, setSecondaryColor,
        primaryBackgroundColor, setPrimaryBackgroundColor,
        secondaryBackgroundColor, setSecondaryBackgroundColor
    }

    return <ThemeContext.Provider value={states} >{children}</ThemeContext.Provider>
}


export function useTheme(): ThemeContextType{
    return useContext(ThemeContext);
}


type ThemeViewProps = ViewProps & {
    backgroundColor?: string,
    isPrimary?: boolean,
    useInvertTheme?: boolean,
    style?: ViewStyle
}

export function ThemeView({style, backgroundColor, isPrimary=true, useInvertTheme=false, ...props}: ThemeViewProps): React.JSX.Element {
    const {primaryColor, secondaryColor, primaryBackgroundColor, secondaryBackgroundColor} = useTheme()
    
    if(!backgroundColor) {
        if(useInvertTheme){
            backgroundColor = isPrimary ? primaryColor : secondaryColor;
        } else {
            backgroundColor = isPrimary ? primaryBackgroundColor : secondaryBackgroundColor;
        }
    }
    
    return <View {...props} style={[style, {backgroundColor}]} />
}


type TextThemeProps = TextProps & {
    style?: TextStyle,
    color?: string,
    isPrimary?: boolean,
    useInvertTheme?: boolean
}

export function TextTheme({style, color, isPrimary, useInvertTheme, ...props}: TextThemeProps): React.JSX.Element {
    const {primaryColor, secondaryColor, primaryBackgroundColor, secondaryBackgroundColor} = useTheme();
    
    if(!color) {
        if(useInvertTheme) {
            color = isPrimary ? primaryBackgroundColor : secondaryBackgroundColor;
        } else {
            color = isPrimary ? primaryColor : secondaryColor;
        }
    }

    return (
        <Text style={[style, {color}]} {...props} />
    )
}