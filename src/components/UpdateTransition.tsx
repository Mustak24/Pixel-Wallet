// import { StackScreenProps } from "@react-navigation/stack";
// import { useContext, useEffect, useState } from "react";
// import { KeyboardAvoidingView, Pressable, View } from "react-native";
// import AccountModal from "../Database/Models/AccountModal";
// import style from '../../AppStyle'
// import { AppContext, months } from "../Contexts/App";
// import { ScrollView, Text, TextInput } from "react-native-gesture-handler";
// import AnimateButton from "../components/Buttons/AnimateButton";
// import FeatherIcons from 'react-native-vector-icons/Feather'
// import TextTheme from "../components/Text/TextTheme";
// import BottomModal from "../components/Modal/BottomModal";
// import Calculator from "../components/Calculator";
// import TransitionModal from "../Database/Models/TransitionModal";
// import { AccountStackParamsList } from "../Navigation/StackNavigation/AccountsStackNavigator";

// type transitionInfoType = {
//     mode: 'income' | 'expense' | 'transfer',
//     backgroundColor: string,
//     iconName: 'download' | 'upload' | 'shuffle',
//     title: string
// }

// const transitionInfo: transitionInfoType[] = [
//     {
//         mode: 'income',
//         backgroundColor: 'rgb(25,200,150)',
//         iconName: 'download',
//         title: 'Add to money'
//     },

//     {
//         mode: 'expense',
//         backgroundColor: 'gray',
//         iconName: 'upload',
//         title: 'Pay with'
//     },

//     {
//         mode: 'transfer',
//         backgroundColor: 'rgb(130,100,255)',
//         iconName: 'shuffle',
//         title: 'From'
//     }
// ]

// type PropsType = {
//     accounts: AccountModal[],
//     transitionMode: 'income' | 'expense' | 'transfer',
//     amount: number,
//     title: string,
//     description: string,
//     year: number,
//     month: number,
//     date: number,
//     hours: number,
//     minute: number,
//     fromAccount: AccountModal,
//     toAccount: AccountModal
// }

// export default function CreateTranstion(props: PropsType): React.JSX.Element {

//     const {color, backgroundColor, setTotalBalance, setAccounts} = useContext(AppContext);
    

//     const [accounts, setAccounts] = useState<AccountModal>(props.accounts);

//     const [transitionMode, setTransitionMode] = useState<'income' | 'expense' | 'transfer'>(route.params.mode);
//     const [amount, setAmount] = useState<number>(0);
//     const [title, setTitle] = useState<string>('');
//     const [description, setDescription] = useState<string>('');
//     const [year, setYear] = useState(new Date().getFullYear());
//     const [month, setMonth] = useState<number>(new Date().getMonth());
//     const [date, setDate] = useState<number>(new Date().getDate());
//     const [hour, setHour] = useState<number>(new Date().getHours());
//     const [minute, setMinute] = useState<number>(new Date().getMinutes());

//     const [isDescriptionModalOpen ,setDescriptionModalOpen] = useState<boolean>(false);
//     const [isCalOpen, setCalOpen] = useState<boolean>(false);

//     function createTransition(){
//         let tra = TransitionModal.create({
//             title, description, fromAccountId: account.id, mode: transitionMode, amount, 
//             createOn: {year, month, date, hour, minute}, 
//             toAccountId: ''
//         });

//         if(!tra) return;

//         setAmount(0); setTitle(''); setDescription('');
//         setYear(new Date().getFullYear()); setMonth(new Date().getMonth())
//         setDate(new Date().getDate()); setHour(new Date().getHours())
//         setMinute(new Date().getMinutes())

//         setTotalBalance(AccountModal.getTotalBalance());
//         setAccounts(AccountModal.getAll());
//     }


//     return (<>
//         <KeyboardAvoidingView 
//             style={[style.flex, style.itemCenter, style.justifyBetween, style.width100, style.height100, {backgroundColor, paddingTop: 44}]}
//         >
//             <ScrollView 
//                 style={[style.flex, style.width100, style.height100, {paddingBlock: 10, paddingInline: 20}]}
//             >
//                 <View 
//                     style={[style.flex, style.itemCenter, style.justifyBetween, style.flexRow,style.width100, {height: 50, paddingBottom: 10}]}
//                 >
//                     <AnimateButton 
//                         style={{...style.center, width: 44, aspectRatio: 1, borderRadius: 100, borderWidth: 2, borderColor: color}} 
//                         onPress={() => navigation.goBack()}
//                     >
//                         <FeatherIcons name="plus" size={20} color={'white'} style={{transform: 'rotate(45deg)'}} />
//                     </AnimateButton>

//                     <View style={[style.center, style.flexRow, {gap: 6}]}>
//                         {
//                             transitionInfo.map(({backgroundColor, iconName, mode}) => (
//                                 <AnimateButton 
//                                     key={mode}
//                                     style={{ 
//                                         ...style.center,
//                                         backgroundColor: mode == transitionMode ?  backgroundColor : 'transparent',
//                                         width: 44, aspectRatio: 1, borderRadius: 100, borderColor: 'gray', borderWidth: 2
//                                     }} 
//                                     onPress={() => setTransitionMode(mode)}
//                                 >
//                                         <FeatherIcons
//                                             color={'white'} 
//                                             size={20}
//                                             name={iconName} 
//                                             />
//                                     </AnimateButton>
//                                 )
//                             )
//                         }
//                     </View>
//                 </View>

//                 <View style={{marginBlock: 20}}>
//                     <TextInput 
//                         value={title}
//                         style={{fontSize: 20, fontWeight: '900', width: '100%', height: 60, borderBottomWidth: 1, borderBottomColor: 'gray', color, opacity: title ? 1 : .5}} 
//                         onChangeText={setTitle}
//                         placeholder={`${transitionMode.toLocaleUpperCase()} TITLE`}
//                         placeholderTextColor={color}     
//                     />
//                 </View>

//                 <View style={[style.center, {gap: 10}]}>
//                     <AnimateButton style={{display: 'flex', padding: 20, borderRadius: 20, backgroundColor: 'rgb(24,24,24)', width: '100%', justifyContent: 'center'}} onPress={() => setDescriptionModalOpen(true)}>
//                         <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 14}}>
//                             <FeatherIcons name="align-left" size={20} color={'white'} />
//                             <TextTheme style={{color: 'white', fontWeight: '900'}}>Add description</TextTheme>
//                         </View>
//                         {description && <TextTheme style={{color: 'white', fontSize: 12, opacity: 0.8}} numberOfLines={8}>{description}</TextTheme>}
//                     </AnimateButton>

//                     <AnimateButton style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderRadius: 20, paddingInline: 20, gap: 14, width: '100%', height: 60, backgroundColor: 'rgb(25,25,25)'}}>
//                         <View style={[style.center, {gap: 14, flexDirection: 'row'}]}>
//                             <FeatherIcons name="calendar" size={20} color={'white'} />
//                             <TextTheme style={{color: 'white', fontWeight: '900', opacity: 0.4}}>Created on</TextTheme>
//                         </View>
//                         <TextTheme style={{color: 'white', fontWeight: '900'}}>
//                             {date} {months[month]}, {hour%12 || 12}:{minute < 10 ? `0${minute}` : minute} {hour >= 12 ? 'PM' : 'AM'}
//                         </TextTheme>
//                     </AnimateButton>
//                 </View>
//             </ScrollView>

//             <View 
//                 style={{width: '100%', backgroundColor, paddingTop: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 1, borderColor: 'gray', borderBottomWidth: 0, marginInline: 2}}
//             >
//                 <View style={[style.flex, style.itemStart, {paddingInline: 20}]}>
//                     <TextTheme style={{fontSize: 16, fontWeight: 900}} >{transitionInfo[transitionMode == 'income' ? 0 : 1].title}</TextTheme>

//                     <TextTheme style={{fontWeight: 900, fontSize: 20, borderBottomWidth: 1, borderColor: 'gray', paddingRight: 10, paddingLeft: 2}}>{account.name}</TextTheme>

//                     <Pressable style={[style.center, {width: '100%', alignSelf: 'center', marginBottom: 20}]} onPress={() => setCalOpen(true)}>
//                         <TextTheme style={{fontWeight: 800, fontSize: 14, opacity: 0.6}}>Enter Amount</TextTheme>
//                         <TextTheme style={{fontWeight: '900', fontSize: 28,}}>
//                             <Text>{amount || '0.00'}</Text>
//                             <Text> INR</Text>
//                         </TextTheme>
//                     </Pressable>
//                 </View>

//                 <View style={[style.flex, style.flexRow, style.itemCenter, style.justifyEnd, style.width100, {position: 'relative'}]}>
//                     <View style={{width: '100%', height: 1, backgroundColor: "gray", position: 'absolute'}}></View>
//                     <Pressable onPress={createTransition} style={[style.center, {paddingInline: 20, borderRadius: 100, height: 44, backgroundColor: account.backgroundColor, margin: 20}]} >
//                         <TextTheme style={{fontSize: 14, fontWeight: 900}}>Add</TextTheme>
//                     </Pressable>
//                 </View>
//             </View>

//         </KeyboardAvoidingView>

//         <BottomModal
//             visible={isDescriptionModalOpen} 
//             setVisible={setDescriptionModalOpen} 
//             style={{paddingInline: 20}}
//             actionButtons={[{title: 'Add', backgroundColor: 'rgb(25,200,150)', onPress: () => setDescriptionModalOpen(false)}]}
//             backgroundColor="rgba(0,0,0,0.8)"
//         >
//             <TextTheme style={{color: 'white', fontSize: 16, fontWeight: '900', paddingLeft: 8}}>Add Description</TextTheme>
//             <TextInput 
//                 value={description}
//                 style={{fontSize: 14, color, maxHeight: 280, opacity: description ? .9 : .5}} 
//                 multiline={true}
//                 placeholder="Add description ..." 
//                 placeholderTextColor={color}
//                 onChangeText={setDescription}
//                 autoFocus={true}
//             />
//         </BottomModal>

//         <BottomModal visible={isCalOpen} setVisible={setCalOpen} actionButtons={[{title: 'Add', backgroundColor: 'rgb(25,200,150)', onPress: ()=> setCalOpen(false)}]}>
//             <View style={[style.flex, style.itemStart, {paddingInline: 20}]}>
//                 <TextTheme style={{fontSize: 16, fontWeight: 900}} >{transitionInfo[transitionMode == 'income' ? 0 : 1].title}</TextTheme>

//                 <View style={[style.center, {backgroundColor: account.backgroundColor, paddingInline: 20, borderRadius: 100, height: 44, marginBlock: 10}]}>
//                     <TextTheme>{account.name}</TextTheme>
//                 </View>

//                 <View style={[style.center, style.width100]}>  
//                     <Calculator onResult={setAmount} value={amount} />
//                 </View>
//             </View>
//         </BottomModal>
//     </>)
// }