import { StyleSheet } from "react-native"


export default StyleSheet.create({
    center: {alignItems: 'center', justifyContent: 'center', display: 'flex'},
    flex: {display: 'flex'},
    flexRow: {flexDirection: 'row'},
    itemCenter: {alignItems: 'center'},
    justifyCenter: {justifyContent: 'center'},
    itemStart: {alignItems: 'flex-start'},
    itemEnd: {alignItems: 'flex-end'},
    justifyStart: {justifyContent: 'flex-start'},
    justifyEnd: {justifyContent: 'flex-end'},
    justifyAround: {justifyContent: 'space-around'},
    justifyBetween: {justifyContent: 'space-between'},
    justifyEvenly: {justifyContent: 'space-evenly'},
    flex1: {flex: 1},
    width100: {width: '100%'},
    height100: {height: '100%'},
})