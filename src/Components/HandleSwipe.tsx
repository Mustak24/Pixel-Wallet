import { useRef } from "react";
import { GestureResponderEvent, PanResponder, PanResponderGestureState, StyleProp, View, ViewStyle } from "react-native";

type handleSwipeProps = {
    children: React.ReactNode,
    onSwipeUp?: () => void,
    onSwipeRight?: () => void,
    onSwipeDown?: () => void,
    onSwipeLeft?: () => void,
    style?: StyleProp<ViewStyle>
}

const fn = ()=>{}

export default function HandleSwipe({children, style, onSwipeUp=fn, onSwipeRight=fn, onSwipeDown=fn, onSwipeLeft=fn}: handleSwipeProps): React.JSX.Element {

    const pad = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return Math.abs(gestureState.dx) > 20 || Math.abs(gestureState.dy) > 20;
          },
          onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            const { dx, dy } = gestureState;
            if (Math.abs(dx) > Math.abs(dy)) {
              if (dx > 0) {
                onSwipeRight()
              } else {
                onSwipeLeft()
              }
            } else {
              if (dy > 0) {
                onSwipeDown();
              } else {
                onSwipeUp();
              }
            }
          },
    })).current;

    return (
        <View style={style} {...pad.panHandlers}>{children}</View>
    )
}