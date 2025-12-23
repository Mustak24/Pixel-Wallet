import { useTheme } from "../../Contexts/ThemeProvider";
import FeatherIcon from "../Icon/FeatherIcon";
import AnimateButton from "./AnimateButton";


type Props = {
    size?: number,
    iconName: string,
    iconSize?: number,
    backgroundColor?: string,
    color?: string,
    onPress?: () => void,
    isPrimary?: boolean
}

export default function IconButton({size=36, iconName, iconSize=16, backgroundColor, color, onPress=()=>{}, isPrimary=false}: Props): React.JSX.Element {

    const {primaryBackgroundColor, primaryColor} = useTheme();

    color ??= (isPrimary ? primaryBackgroundColor : primaryColor)
    backgroundColor ??= (isPrimary ? primaryColor : primaryBackgroundColor);

    return (
        <AnimateButton
            style={{width: size, aspectRatio: 1, borderRadius: size, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor, borderWidth: 2, borderColor: primaryColor}}
            bubbleColor={color}
            onPress={onPress}
        >
            <FeatherIcon name={iconName} color={color} size={iconSize} />
        </AnimateButton>
    )
}