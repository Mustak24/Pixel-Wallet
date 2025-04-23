import { Text, View } from "react-native";
import AccountModal from "../../Database/Models/AccountModal";
import style from '../../../AppStyle'

type AccountCardProps = {
    id: string,
    incomeThisMonth: number,
    expenseThisMonth: number,
    backgroundColor: string,
    balance: number,
    name: string
}

export default function AccountCard({id, incomeThisMonth, expenseThisMonth, backgroundColor, balance, name}: AccountCardProps): React.JSX.Element{

    const account = AccountModal.findById(id);

    return account ? (
        <View style={[style.width100, style.flex, {marginBlock: 10, borderRadius: 20, overflow: 'hidden', position: 'relative'}]}>

            <View style={{display: 'flex', backgroundColor, width: "100%", padding: 20, gap: 12, position: 'relative'}}>
                <Text style={{fontSize: 18, fontWeight: 900, color: 'white'}}>{name}</Text>
                <Text style={{fontSize: 24, color: 'white'}}>
                    <Text style={{fontWeight: 900}}>{balance}</Text>
                    <Text> INR</Text>
                </Text>
            </View>

            <View 
                style={[style.flex, style.itemCenter, style.flexRow, style.width100, {borderWidth: 1, borderTopWidth: 0, borderColor: 'gray', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}]}
            >
                <View style={[style.center, {flex: 1, height: 80}]}>
                    <Text style={{color: 'white', fontSize: 12}}>INCOME THIS MOUNTH</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                        <Text style={{fontWeight: 900}}>{incomeThisMonth}</Text>
                        <Text> INR</Text>
                    </Text>
                </View>

                <View style={{backgroundColor: 'gray', height: 60, width: 1, borderRadius: 100}}></View>
                
                <View style={[style.center, {flex: 1, height: 80}]}>
                    <Text style={{color: 'white', fontSize: 12}}>EXPENSE THIS MOUNTH</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                        <Text style={{fontWeight: 900}}>{expenseThisMonth}</Text>
                        <Text> INR</Text>
                    </Text>
                </View>
            </View>
        </View>
    ) : <></>
}