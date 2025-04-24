import { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, findNodeHandle, Pressable, PressableProps, Text, UIManager, View, ViewStyle } from "react-native";
import { GestureResponderEvent } from "react-native";

type AnimateButtonProps = {
    children?: ReactNode,
    style?: ViewStyle,
    title?: string,
    duration?: number,
    scale?: number,
    onPress?: (event: GestureResponderEvent) => void,
    props?: PressableProps,
    color?: string,
    delay?: number
}


export default function AnimateButton({children, style={}, duration=300, scale=10, onPress=()=>{}, props={}, title='Click', color='white', delay=200}: AnimateButtonProps ): React.JSX.Element {

    const [pressPoints, setPressPoints] = useState<{x: number, y: number}>({x: -1, y: -1});

    const opacityAnime = useRef<Animated.Value>(new Animated.Value(.8)).current;
    const scaleAnime = useRef<Animated.Value>(new Animated.Value(0)).current;
    const button = useRef<View>(null);
    const timeout = useRef<NodeJS.Timeout>(null);

    function animate(event: GestureResponderEvent): void{
        let {nativeEvent} = event;
        let {pageX, pageY} = nativeEvent;    

        let nodeHandler = findNodeHandle(button.current);
        if(!nodeHandler) return;

        UIManager.measure(nodeHandler, (x, y, w, h, px, py) => {
            pageX -= px; pageY -= py;
            setPressPoints({x: pageX, y: pageY});
        });

        if(timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => onPress(event), delay);
    }

    useEffect(() => {

        if(pressPoints.x < 0 && pressPoints.y < 0) return;
        
        Animated.parallel([
            Animated.timing(opacityAnime, {
                toValue: 0, duration, useNativeDriver: true
            }),
            Animated.timing(scaleAnime, {
                toValue: scale, duration, useNativeDriver: true
            })
        ]).start(() => {
            scaleAnime.setValue(0);
            opacityAnime.setValue(.8);
        });

    }, [pressPoints])

    return (
        <Pressable ref={button} onPress={animate} style={[style, {position: 'relative', overflow: "hidden"}]} {...props} >
            <Animated.View  style={{
                position: 'absolute', aspectRatio: 1, borderRadius: 10000, left: pressPoints.x - 5, top: pressPoints.y - 5, 
                opacity: opacityAnime, transform: [{scale: scaleAnime}],
                borderWidth: 10, borderColor: 'white'
            }}></Animated.View>
            {children || <Text style={{color}}>{title}</Text>}
        </Pressable>
    );
}