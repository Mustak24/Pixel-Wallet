import { RefObject, useState } from "react";
import { Animated, useAnimatedValue } from "react-native";
import useStateRef from "./useStateRef";


export type useBinaryAnimateValueProps = {
    value: 0 | 1,
    duration: number,
    delay?: number,
    useNativeDriver?: boolean
}


type TimingOptions = {
    duration?: number, delay?: number
}

type AnimationFunction = (timingOption?: TimingOptions, callback?: () => void) => void;

export type useBinaryAnimatedValueReturnType = {
    value: Animated.Value,
    valueRef: RefObject<0 | 1>,
    valueState: 0 | 1,
    animateTo1: AnimationFunction,
    animateTo0: AnimationFunction,
    isAnimationRuning: {state: boolean, ref: RefObject<boolean>}
}

export default function useBinaryAnimateValue({value: v, duration, delay=0, useNativeDriver=true}: useBinaryAnimateValueProps): useBinaryAnimatedValueReturnType {

    const defaultTimingOptions: TimingOptions = {duration, delay}

    const value = useAnimatedValue(v);
    const [valueState, setValueState, valueRef] = useStateRef<0 | 1>(v);
    const [isAnimationRuningState, setIsAnimationRuningState, isAnimationRuningRef] = useStateRef(false);

    const animateTo1: AnimationFunction = ({duration, delay}=defaultTimingOptions, cb=()=>{}) => {
        setValueState(1)
        setIsAnimationRuningState(true);
        Animated.timing(value, {
            toValue: 1, duration, delay, useNativeDriver
        }).start(() => {
            setIsAnimationRuningState(false);
            cb();
        })
    }

    const animateTo0: AnimationFunction = ({duration, delay}=defaultTimingOptions, cb=()=>{}) => {
        setValueState(0);
        setIsAnimationRuningState(true);
        Animated.timing(value, {
            toValue: 0, duration, delay, useNativeDriver
        }).start(() => {
            setIsAnimationRuningState(false);
            cb();
        })
    }

    return {
        value, valueRef, valueState,
        animateTo0, animateTo1,
        isAnimationRuning: {state: isAnimationRuningState, ref: isAnimationRuningRef}
    }
}