import { Animated, Dimensions, Keyboard, useAnimatedValue, View } from "react-native";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { PanResponder } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStateRef from "../../../Hooks/useStateRef";
import { ThemeView, useTheme } from "../../../Contexts/ThemeProvider";
import ShowWhen from "../../Other/ShowWhen";
import { SlidingBottomModalProps } from ".";


export type SlidingContainerProps = Pick<SlidingBottomModalProps, 'children' | 'visible' | 'header' | 'footer'> & {
    handleClose: () => void
}


export default function SlidingContainer({children, visible, handleClose, header, footer}: SlidingContainerProps) {

    const {primaryBackgroundColor} = useTheme()

    const {height: windowHeight} = Dimensions.get('window');
    const {top, bottom} = useSafeAreaInsets();

    const [autoHeight, setAutoHeight, autoHeightRef] = useStateRef<'auto' | number>('auto');

    const [heightsInfo, setHeightInfo] = useState({
        header: 0, footer: 0
    })

    const MAX_HEIGHT = useRef(windowHeight - top - bottom);

    const animateHeight = useAnimatedValue(0);
    const animateMaxHeight = useAnimatedValue(windowHeight - top - bottom);
    const animateTranslateY = useAnimatedValue(1);

    const {panHandlers} = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dy) > 5;
        },

        onPanResponderTerminationRequest: () => false,
        
        onPanResponderMove: (e, {moveY}) => {
            if(autoHeightRef.current === 'auto') return;

            const newHeight = MAX_HEIGHT.current - moveY;

            if(newHeight >= autoHeightRef.current) {    
                animateHeight.setValue(Math.max(autoHeightRef.current, newHeight))
            } else {
                const dy = (autoHeightRef.current - newHeight) / autoHeightRef.current;
                animateTranslateY.setValue(dy);
            }
        },

        onPanResponderRelease: (e, {vy, moveY}) => {
            if(autoHeightRef.current === 'auto') return;

            if(vy > 1) return handleSwipeDown();
            if(vy < -1) return handleSwipeUp();

            const mid = MAX_HEIGHT.current - autoHeightRef.current;
            const y1 = Math.floor(mid / 2);
            const y2 = Math.floor(mid + autoHeightRef.current / 2);

            const p = moveY;

            if(p < y1) return handleSwipeUp();
            if(p > y2) return handleSwipeDown();


            Animated.parallel([
                Animated.spring(animateHeight, {
                    toValue: autoHeightRef.current,
                    bounciness: 12,
                    useNativeDriver: false
                }),
                Animated.spring(animateTranslateY, {
                    toValue: 0,
                    useNativeDriver: false
                })
            ]).start()
        }
    })).current;


    function handleSwipeUp() {
        Animated.spring(animateHeight, {
            toValue: windowHeight,
            bounciness: 12,
            useNativeDriver: false
        }).start()
    }


    function handleSwipeDown() {
        Animated.parallel([
            Animated.spring(animateHeight, {
                toValue: 0,
                useNativeDriver: false
            }),

            Animated.spring(animateTranslateY, {
                toValue: 1,
                useNativeDriver: false
            })
        ]).start(() => {
            handleClose();
        })
    }


    useEffect(() => {
        if(!visible) return;

        setAutoHeight('auto');

        Animated.spring(animateTranslateY, {
            toValue: 0,
            useNativeDriver: false
        }).start();

    }, [visible])


    useEffect(() => {
        Animated.spring(animateMaxHeight, {
            toValue: MAX_HEIGHT.current,
            useNativeDriver: false
        }).start();
    }, [MAX_HEIGHT])


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ({ endCoordinates }) => {
            MAX_HEIGHT.current -= endCoordinates.height;
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ({ endCoordinates }) => {
            MAX_HEIGHT.current += endCoordinates.height;
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [])


    return (
        <Animated.View 
            onLayout={({nativeEvent: {layout}}) => {
                setAutoHeight(pre => pre === 'auto' ? layout.height || 'auto' : pre);
            }}
        
            style={{
                width: '100%', 
                borderTopLeftRadius: 20, 
                borderTopRightRadius: 20, 
                overflow: 'hidden',
                justifyContent: 'space-between',

                minHeight: autoHeight,
                maxHeight: animateMaxHeight,
                backgroundColor: primaryBackgroundColor,
                height: autoHeight === 'auto' ? 'auto' : animateHeight,

                transform: [{translateY: animateTranslateY.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-100%', '100%']
                })}]
            }}
        >
            <View style={{width: '100%'}} >
                <View {...panHandlers} style={{width: '100%', height: 20, alignItems: 'center', justifyContent: 'center'}} >
                    <ThemeView isPrimary={false} style={{width: 40, height: 4, borderRadius: 20}} />
                </View>

                <ShowWhen when={!!header} >
                    <View 
                        style={{alignSelf: 'flex-start', position: 'relative'}} 

                        onLayout={({nativeEvent: {layout}}) => {
                            setHeightInfo((pre) => ({...pre, header: layout.height}))
                        }} 
                    >
                        {header}
                    </View>
                </ShowWhen>
                
                <View 
                    style={{
                        position: 'relative',
                        maxHeight: autoHeight === 'auto' ? 'auto' : (
                            autoHeight - (heightsInfo.footer + heightsInfo.header + 20)
                        )
                    }} 
                >
                    {children}
                </View>
            </View>
            
            <ShowWhen when={!!footer} >
                <View 
                    style={{alignSelf: 'flex-end', position: 'relative'}} 
                        
                    onLayout={({nativeEvent: {layout}}) => {
                        setHeightInfo((pre) => ({...pre, footer: layout.height}))
                    }} 
                >
                    {footer}
                </View>
            </ShowWhen>
        </Animated.View>
    )
}