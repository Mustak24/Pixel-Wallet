import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../Contexts/ThemeProvider';
import { ViewStyle } from 'react-native';

type Props = {
    name: string,
    size: number,
    color?: string,
    style?: ViewStyle,
    isPrimary?: boolean,
    useInversTheme?: boolean
}

export default function FontAwesomeIcon({name, size, color, style, isPrimary=true, useInversTheme=false}: Props) {
    const {primaryColor, secondaryColor, primaryBackgroundColor, secondaryBackgroundColor} = useTheme();
    
    
    if(useInversTheme && !color) {
        color = isPrimary ? primaryBackgroundColor : secondaryBackgroundColor;
    } else if(!color) {
        color = isPrimary ? primaryColor : secondaryColor;
    }
    

    return <FontAwesomeIcons name={name} size={size} color={color} style={style} />
}