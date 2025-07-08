import { StyleSheet, Text, View } from "react-native";
import FeatherIcons from 'react-native-vector-icons/Feather';
import AccountModal from "../../Database/Models/AccountModal";
import { createOnType } from "../../Database/Models/TransitionModal";
import AnimateButton from "../Buttons/AnimateButton";
import { TextTheme, useTheme } from "../../Contexts/ThemeProvider";
import style from '../../../AppStyle'
import FeatherIcon from "../Icon/FeatherIcon";


type TransitionCardProps = {
    id: string
    mode: 'income' | 'expense' | 'transfer'
    title: string
    category: string
    description: string
    fromAccountId: string
    toAccountId: string
    createOn: createOnType
    amount: number,
    onPress?: () => void
}
const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function TransitionCard({id, mode, title, category, description, fromAccountId, toAccountId, createOn, amount, onPress=()=>{}}: TransitionCardProps): React.JSX.Element {

    const {secondaryBackgroundColor, primaryColor, primaryBackgroundColor: backgroundColor} = useTheme();

    const color = mode == 'income' ? 'rgb(25,200,150)' : mode == 'expense' ? 'gray' : 'rgb(130,100,255)';
    const fromAccountName = AccountModal.findById(fromAccountId)?.name;
    const toAccountName = AccountModal.findById(toAccountId)?.name;

    const date: string = `${months[createOn.month]} ${createOn.date}`;    

    return (
        <View style={styles.root}>
            <View style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', flexDirection: 'row', paddingInline: 0}}>
                <TextTheme style={styles.date}>{date}</TextTheme>

                <TextTheme style={{color, fontSize: 14}}>
                        <Text style={{fontWeight: 800}}>{mode == 'income' ? '+' : mode == 'expense' ? '-' : ''}{amount}</Text>
                        <Text> INR</Text>
                </TextTheme>
            </View>

            <AnimateButton onPress={onPress} scale={15} style={{...styles.card, backgroundColor: secondaryBackgroundColor}}>
                <View style={[style.center, style.flexRow, {gap: 10}]}>
                    {
                        category && (
                            <View style={[styles.mode, {backgroundColor}]}>
                                <TextTheme style={{fontWeight: 800}} >{category}</TextTheme>
                            </View>
                        )
                    }
                    <View style={[styles.mode, {backgroundColor}]}>
                        <Text style={{color: primaryColor, fontSize: 14, fontWeight: 900}}>{fromAccountName || ''}</Text>
                        {
                            mode == 'transfer' ? (
                                <>
                                    <FeatherIcon name="chevrons-right" size={14} style={{marginHorizontal: 4}} />
                                    <TextTheme style={{fontSize: 14, fontWeight: 900}}> {toAccountName || ''}</TextTheme>
                                </>
                            ): null
                        }
                    </View>
                </View>

                <View style={{paddingLeft: 10}}>
                    {title && <TextTheme style={styles.title}>{title}</TextTheme>}
                    {description && <TextTheme numberOfLines={10} style={styles.description}>{description}{description?.at(-1) === '.' ? '' : '.'}</TextTheme>}
                </View>
                
                <View style={{display: "flex", gap: 10, flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
                    <FeatherIcons name={mode == 'income' ? "download" : mode == 'expense' ? 'upload' : 'shuffle'} size={20} color={'white'} style={[styles.icon, {backgroundColor: color}]} />
                    <Text style={{color, fontSize: 20}}>
                        <Text style={{fontWeight: 800}}>{amount}</Text>
                        <Text> INR</Text>
                    </Text>
                </View>
            </AnimateButton>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        marginBlock: 10,
        display: 'flex',
        width: '100%',
        gap: 18,
        position: 'relative'
    },

    card: {
        display: 'flex', 
        alignItems: 'flex-start',
        width: '100%',
        padding: 14,
        paddingBlock: 20, 
        borderRadius: 14, 
        position: 'relative',
        gap: 10,
    },

    mode: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        height: 34,
        paddingInline: 20,
        borderRadius: 1000,
        backgroundColor: 'black',
    },

    title: {
        display: 'flex',
        fontWeight: 900,
        color: 'white',
        fontSize: 14,
    },

    date: {
        fontSize: 24,
        fontWeight: 900,
        color: 'white',
    },

    description: {
        fontSize: 10,
        fontWeight: 800,
        opacity: 0.8,
        color: 'white',
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon: {
        aspectRatio: 1,
        borderRadius: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    }
})