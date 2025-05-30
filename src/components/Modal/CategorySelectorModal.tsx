
import BottomModal from "./BottomModal";
import TextTheme from "../Text/TextTheme";
import { View } from "react-native";
import style from '../../../AppStyle';
import { useTheme } from "../../Contexts/ThemeProvider";
import AnimateButton from "../Buttons/AnimateButton";

type PropsType = {
    visible: boolean,
    setVisible: (vis: boolean) => void,
    selected: string,
    setSelected: (val: string) => void
}

const categorys: string[] = [
    '🍹 Food & Drinks',
    '📜 Bills & Fees',
    '🚍 Transport',
    '🛒 Shopping',
    '🎁 Gifts',
    '💊 Health'
]

export default function CategorySelectorModal({visible, setVisible, selected, setSelected}: PropsType): React.JSX.Element {

    const {primaryColor: color, primaryBackgroundColor: backgroundColor, secondaryBackgroundColor} = useTheme();

    return (
        <BottomModal 
            visible={visible} 
            setVisible={setVisible} 
            style={{paddingInline: 20}} 
            actionButtons={[
                {
                    title: 'Skip', backgroundColor, onPress: ()=> setVisible(false), color, 
                    style: {borderWidth: 2, borderColor: secondaryBackgroundColor}
                }
            ]}
        >
            <TextTheme style={{fontSize: 16, fontWeight: 900, marginBottom: 20}} >Select Category</TextTheme>
            <View style={[style.flex, style.flexRow, {gap: 5, flexWrap: 'wrap'}]}>
                {
                   categorys.map(category => (
                    <AnimateButton 
                        key={category} 
                        style={{
                            borderWidth: 2, borderRadius: 100, paddingInline: 20, borderColor: secondaryBackgroundColor, paddingBlock: 12,
                            backgroundColor: category == selected ? secondaryBackgroundColor : backgroundColor
                        }}
                        onPress={() => {
                            setSelected(category)
                            setVisible(false);
                        }}
                    >
                        <TextTheme style={{fontWeight: 900, fontSize: 16}} >{category}</TextTheme>
                    </AnimateButton>
                   )) 
                }
            </View>
        </BottomModal>
    )
}