import { Animated, Text, TextStyle, useAnimatedValue } from "react-native"
import AnimateButton from "./AnimateButton"
import React, { useEffect, useRef } from "react"
import ShowWhen from "../Other/ShowWhen"
import { TextTheme, useTheme } from "../../Contexts/ThemeProvider"

export type NormalButtonProps = {
    text: string,
    isPrimary?: boolean,
    onPress?: () => void,
    color?: string,
    backgroundColor?: string,
    height?: number,
    icon?: React.ReactNode,
    spinnerWeight?: number,
    isLoading?: boolean,
    onLoadingText?: string,
    textSize?: number,
    borderRadius?: number,
    paddingInline?: number,
    textWeight?: TextStyle['fontWeight']
}

export default function NormalButton({ text, isPrimary = true, onPress, color, backgroundColor, height = 44, icon, spinnerWeight = 6, isLoading = false, onLoadingText = 'Wait', textSize = 14, paddingInline = 20,borderRadius = 12, textWeight = 700 }: NormalButtonProps) {

    const { primaryBackgroundColor, primaryColor } = useTheme();

    color = color ?? primaryBackgroundColor;
    backgroundColor = backgroundColor ?? primaryColor;

    const animate0to1 = useAnimatedValue(0);
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        animationRef.current = Animated.loop(
            Animated.timing(animate0to1, {
                toValue: 1, duration: 800, useNativeDriver: true
            })
        )
    }, [animationRef])

    useEffect(() => {
        if (!animationRef.current) return;

        isLoading ? animationRef.current.start() : animationRef.current.stop()
    }, [isLoading])

    return (
        <AnimateButton
            onPress={isLoading ? () => { } : onPress}
            bubbleColor={isPrimary ? color : backgroundColor}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingInline,
                height,
                borderRadius,
                gap: 12,
                backgroundColor: isPrimary ? backgroundColor : 'transparent',
                borderWidth: isPrimary ? 0 : 2,
                borderColor: isPrimary ? color : backgroundColor
            }}
        >
            <ShowWhen when={isLoading} otherwise={icon}>
                <Animated.View style={{
                    width: 20, aspectRatio: 1, borderRadius: 40, borderWidth: spinnerWeight,
                    borderBottomColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent',
                    borderTopColor: isPrimary ? color : backgroundColor,
                    transform: [{
                        rotate: animate0to1.interpolate({
                            inputRange: [0, 1], outputRange: ['0deg', '360deg']
                        })
                    }]
                }} />
            </ShowWhen>

            <TextTheme
                color={isPrimary ? color : backgroundColor}
                fontSize={textSize}
                fontWeight={textWeight}

            >
                {isLoading ? onLoadingText : text}
            </TextTheme>
        </AnimateButton>
    )
}