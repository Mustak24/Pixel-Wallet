import { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, findNodeHandle, Pressable, PressableProps, UIManager, View, ViewStyle } from "react-native";
import { GestureResponderEvent } from "react-native";
import { useTheme } from "../../Contexts/ThemeProvider";

type AnimateButtonProps = PressableProps & {
    children?: ReactNode,
    style?: ViewStyle,
    duration?: number,
    bubbleScale?: number,
    onPress?: (event: GestureResponderEvent) => void,
    bubbleColor?: string
}


export default function AnimateButton({children, style={}, duration=300, bubbleScale=10, onPress=()=>{}, bubbleColor, ...props}: AnimateButtonProps ): React.JSX.Element {

    const {secondaryColor} = useTheme()

    bubbleColor = bubbleColor ?? secondaryColor;

    const [pressPoints, setPressPoints] = useState<{x: number, y: number}>({x: -1, y: -1});

    const opacityAnime = useRef<Animated.Value>(new Animated.Value(.5)).current;
    const scaleAnime = useRef<Animated.Value>(new Animated.Value(0)).current;
    const button = useRef<View>(null);

    function animate(event: GestureResponderEvent): void{
        let {nativeEvent} = event;
        let {pageX, pageY} = nativeEvent;    

        let nodeHandler = findNodeHandle(button.current);
        if(!nodeHandler) return;

        UIManager.measure(nodeHandler, (x, y, w, h, px, py) => {
            pageX -= px; pageY -= py;
            setPressPoints({x: pageX, y: pageY});
        });

        onPress(event);
    }

    useEffect(() => {

        if(pressPoints.x < 0 && pressPoints.y < 0) return;
        
        Animated.parallel([
            Animated.timing(opacityAnime, {
                toValue: 0, duration, useNativeDriver: true
            }),
            Animated.timing(scaleAnime, {
                toValue: bubbleScale, duration, useNativeDriver: true
            })
        ]).start(() => {
            scaleAnime.setValue(0);
            opacityAnime.setValue(.5);
        });

    }, [pressPoints])

    return (
        <Pressable ref={button} onPress={animate} style={[style, {position: 'relative', overflow: "hidden"}]} {...props} >
            <Animated.View  style={{
                position: 'absolute', aspectRatio: 1, borderRadius: 10000, left: pressPoints.x - 5, top: pressPoints.y - 5, 
                opacity: opacityAnime, transform: [{scale: scaleAnime}],
                borderWidth: 10, borderColor: bubbleColor
            }}></Animated.View>
            {children}
        </Pressable>
    );
}