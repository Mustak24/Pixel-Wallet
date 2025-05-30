import { Animated, useAnimatedValue, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Text } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useAlert } from "./AlertProvider";

type AlertType = 'error' | 'success' | 'info' | 'warning' | null;

type AlertMsgType = {
    type: AlertType,
    massage?: string,
}

type AlertIconsInfoType = {
    iconName: string, backgroundColor: string
}

type AlertIconsType = {
    error: AlertIconsInfoType, 
    info: AlertIconsInfoType, 
    warning: AlertIconsInfoType, 
    success: AlertIconsInfoType
}

const alertIconsInfo: AlertIconsType = {
    error : {iconName: 'error-outline', backgroundColor: '220, 53, 70'},
    warning :{iconName: 'warning-amber', backgroundColor: '233, 176, 0'},
    info : {iconName: "info-outline", backgroundColor: '0, 122, 255'},
    success : {iconName: "done", backgroundColor: '50, 200, 150'}
}

type Props = {
    duration?: number,
    id?: string
}


export default function AlertCard({duration=5000, id}: Props): React.JSX.Element {

    const {alert, setAlert} = useAlert();
    const {type, massage, id: alertId} = alert;

    if(type == null || !type) return <></>;

    const {iconName, backgroundColor} = alertIconsInfo[type];

    const widthTranstion = useAnimatedValue(0);
    const transtion0to1 = useAnimatedValue(0);

    function Animate() {
        Animated.sequence([
            Animated.timing(transtion0to1, {
                toValue: 1, duration: 300, useNativeDriver: true
            }),
            Animated.timing(widthTranstion, {
                toValue: 1, duration, useNativeDriver: true
            }),
            Animated.timing(transtion0to1, {
                toValue: 0, duration: 300, useNativeDriver: true
            }),
        ]).start(() => {
            setAlert({type: null})
            widthTranstion.setValue(0);
            transtion0to1.setValue(0);
        })
    }


    useEffect(() => {
        if(type && id === alertId) Animate();
    }, [alert]);

    return (
        <View 
            style={{
                position: 'absolute', top: 100, width: '100%', maxWidth: 400, height: 80, left: '50%', borderRadius: 16, display: 'flex', paddingInline: 10, alignItems: 'center', justifyContent: 'center', zIndex: 10000,
                transform: [{translateX: '-50%'}]
            }}
        >
            <Animated.View style={{
                display: 'flex', padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: `rgb(${backgroundColor})`, width: '100%', borderRadius: 12, borderWidth: 4, borderColor: `rgba(${backgroundColor}, 0.4)`, position: 'relative', gap: 8, overflow: 'hidden',
                opacity: transtion0to1,
                transform: [{scale: transtion0to1.interpolate({
                    inputRange: [0, 1], outputRange: [0.6, 1]
                })}]
            }}>
                <MaterialIcons name={iconName} color='white' size={28} />
                <View style={{
                    borderWidth: 0, borderColor: 'white', borderLeftWidth: 2, paddingLeft: 10, display: 'flex', justifyContent: 'flex-start', height: '100%', flex: 1
                }} >
                    <Text style={{color: 'white', fontSize: 12, fontWeight: 500}} numberOfLines={2} >
                        <Text style={{fontWeight: 900, fontSize: 14}}>
                            {type[0].toUpperCase()}
                            {type.slice(1)}
                            {': '}
                        </Text>
                        {massage}
                    </Text>
                </View>

                <Animated.View style={{
                    height: 4, backgroundColor: 'white', position: 'absolute', bottom: 0, borderRadius: 100,
                    width: '110%',
                    transform: [{scaleX: widthTranstion}]
                }} ></Animated.View>
            </Animated.View>
        </View>
    )
}