import { StyleSheet, Text, View } from "react-native";
import FeatherIcons from 'react-native-vector-icons/Feather';

type TransitionCardProps = {
    type: 'income' | 'expenes',
    date: string,
    mode: string,
    title?: string,
    description?: string
}

export default function TransitionCard({type, mode, title='', date, description=''}: TransitionCardProps): React.JSX.Element {
    
    const backgroundColor = type == 'income' ? 'rgb(25,200,150)' : 'gray';

    return (
        <View style={styles.root}>
            <Text style={styles.date}>{date}</Text>
            <View style={[styles.card, {backgroundColor}]}>
                <View style={styles.mode}>
                    <Text style={{color: 'black', fontSize: 16, fontWeight: 900}}>{mode}</Text>
                </View>

                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}{description?.at(-1) === '.' ? '' : '.'}</Text>
                </View>
                
                <View style={{display: "flex", gap: 10, flexDirection: 'row'}}>
                    <FeatherIcons name="download" size={24} color={'white'} />
                    <Text style={{color: 'white', fontSize: 20}}>
                        <Text style={{fontWeight: 800}}>234.03</Text>
                        <Text> INR</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        marginBlock: 10,
        display: 'flex',
        width: '100%',
        gap: 24
    },

    card: {
        display: 'flex', 
        width: '100%',
        padding: 20, 
        borderRadius: 20, 
        position: 'relative',
        gap: 16
    },

    mode: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 1000,
        backgroundColor: 'white',
        position: 'absolute',
        top: -20,
        right: 20,
    },

    title: {
        display: 'flex',
        fontWeight: 900,
        color: 'white',
        fontSize: 28,
    },

    date: {
        fontSize: 28,
        fontWeight: 900,
        color: 'white',
    },

    description: {
        fontSize: 12,
        fontWeight: 800,
        opacity: 0.8,
        color: 'white',
    },

    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})