import { Text, View } from "react-native";
import AccountModal from "../../Database/Models/AccountModal";
import style from '../../../AppStyle'
import { TextTheme } from "../../Contexts/ThemeProvider";
import { useAppContext } from "../../Contexts/AppContext";

type AccountCardProps = {
    id: string,
    incomeThisMonth: number,
    expenseThisMonth: number,
    backgroundColor: string,
    balance: number,
    name: string
}

export default function AccountCard({id, incomeThisMonth, expenseThisMonth, backgroundColor, balance, name}: AccountCardProps): React.JSX.Element{

    const {currency} = useAppContext()
    const account = AccountModal.findById(id);

    return account ? (
        <View style={[style.width100, style.flex, {marginBlock: 10, borderRadius: 20, overflow: 'hidden', position: 'relative'}]}>

            <View style={{display: 'flex', backgroundColor, width: "100%", padding: 20, gap: 2}}>
                <Text style={{fontSize: 26, fontWeight: 900, color: 'white'}}>{name}</Text>
                <Text style={{fontSize: 24, color: 'white', alignSelf: 'center', fontWeight: '900'}}>
                    <Text>{balance}</Text>
                    <Text> {currency}</Text>
                </Text>
            </View>

            <View 
                style={[style.flex, style.itemCenter, style.flexRow, style.width100, {borderWidth: 1, borderTopWidth: 0, borderColor: 'gray', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}]}
            >
                <View style={[style.center, {flex: 1, height: 80}]}>
                    <TextTheme style={{fontSize: 12}}>INCOME THIS MOUNTH</TextTheme>
                    <TextTheme style={{fontSize: 16}}>
                        <Text style={{fontWeight: 900}}>{incomeThisMonth}</Text>
                        <Text> {currency}</Text>
                    </TextTheme>
                </View>

                <View style={{backgroundColor: 'gray', height: 60, width: 1, borderRadius: 100}}></View>
                
                <View style={[style.center, {flex: 1, height: 80}]}>
                    <TextTheme style={{fontSize: 12}}>EXPENSE THIS MOUNTH</TextTheme>
                    <TextTheme style={{fontSize: 16}}>
                        <Text style={{fontWeight: 900}}>{expenseThisMonth}</Text>
                        <Text> {currency}</Text>
                    </TextTheme>
                </View>
            </View>
        </View>
    ) : <></>
}