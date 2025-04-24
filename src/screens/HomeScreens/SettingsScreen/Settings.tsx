import { Animated, Linking, Modal, TouchableOpacity, View, ViewStyle } from "react-native";
import TextTheme from "../../../components/Text/TextTheme";
import { ScrollView, Text, TextInput } from "react-native-gesture-handler";
import AnimateButton from "../../../components/Buttons/AnimateButton";
import style from '../../../../AppStyle'
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../Contexts/App";
import { useNavigation } from "@react-navigation/native";
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import BottomModal from "../../../components/Modal/BottomModal";
import { AppStorage } from "../../../Database/Storage";


export default function Settings(): React.JSX.Element {
    const {color, backgroundColor} = useContext(AppContext);

    const navigation = useNavigation();

    const [name, setName] = useState(AppStorage.getString('username') ?? 'Undefined');

    const [isUpdateNameModalVisible, setUpdateNameModalVisible] = useState<boolean>(false);
    const [isDeleteDataModalVisible, setDeleteDataModalVisible] = useState<boolean>(false);

    const hearAnimate = useRef<Animated.Value>(new Animated.Value(0.98)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(hearAnimate, {
                    toValue: 1.15, duration: 200, useNativeDriver: true
                }),
                Animated.timing(hearAnimate, {
                    toValue: 0.98, duration: 600, useNativeDriver: true
                })
            ])
        ).start();
    }, [])

    return (
        <View style={[style.flex, style.itemCenter, style.width100, style.height100, {paddingTop: 40, paddingInline: 20, backgroundColor}]}>
            <View style={[style.flex, style.itemCenter, style.justifyBetween, style.flexRow, style.width100, {paddingBottom: 20}]}>
                <TouchableOpacity
                    style={{...style.center, width: 44, aspectRatio: 1, borderRadius: 100, borderWidth: 2, borderColor: color}} 
                    onPress={() => navigation.goBack()}
                    >
                    <FeatherIcons name="plus" size={20} color={'white'} style={{transform: 'rotate(45deg)'}} />
                </TouchableOpacity>

                <View style={[style.center, style.flexRow, {gap: 4}]}>
                    <TextTheme style={{fontWeight: '900'}}>Build with</TextTheme>
                    <Animated.View style={{transform: [{scale: hearAnimate}]}}>
                        <AntDesignIcons name="heart" size={16} color={'rgb(250,50,50)'} />
                    </Animated.View>
                    <TextTheme style={{fontWeight: '900'}}>by Mustak24</TextTheme>
                </View>
            </View>

            <ScrollView style={[style.width100]} showsVerticalScrollIndicator={false}>
                <TextTheme style={{fontWeight: '900', fontSize: 28}}>Settigns</TextTheme>
                
                <TextTheme style={{opacity: 0.5, paddingLeft: 4, fontWeight: '900', fontSize: 20, marginTop: 24}}>Account</TextTheme>

                <Container style={{marginBlock: 14}} onPress={() => setUpdateNameModalVisible(true)}>
                    <TextTheme style={{fontWeight: '900', opacity: 0.6}}>Name</TextTheme>
                    
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16, marginTop: 16}]}>
                        <FeatherIcons name="user" size={26} color={color} />
                        <TextTheme style={{fontWeight: '900', fontSize: 16}}>{name}</TextTheme>
                    </View>
                </Container>


                <TextTheme style={{opacity: 0.5, paddingLeft: 4, fontWeight: '900', fontSize: 20, marginTop: 24}}>Other</TextTheme>

                <Container style={{marginBlock: 14}} backgroundColor="rgb(50,150,250)">
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16}]}>
                        <FeatherIcons name="star" size={26} color={color} />
                        <TextTheme style={{fontWeight: '900', fontSize: 16}}>Rate us on Google Play</TextTheme>
                    </View>
                </Container>
                
                <Container style={{marginBlock: 14}} backgroundColor="rgb(250,50,150)">
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16}]}>
                        <FeatherIcons name="share-2" size={26} color={color} />
                        <TextTheme style={{fontWeight: '900', fontSize: 16}}>Share E Wallet</TextTheme>
                    </View>
                </Container>

                <Container style={{marginBlock: 14}}>
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16}]}>
                        <FeatherIcons name="file-text" size={26} color={color} />
                        <TextTheme style={{fontWeight: '900', fontSize: 16}}>Privacy Policy</TextTheme>
                    </View>
                </Container>

                <Container 
                    style={{marginBlock: 14}} 
                    onPress={() => Linking.openURL('https://github.com/Mustak24/E_Wallet')}
                >
                    <TextTheme style={{fontWeight: '900', opacity: 0.6}}>OPEN SOURCE</TextTheme>
                    
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16, marginTop: 16}]}>
                        <FeatherIcons name="github" size={32} color={color} />
                        <View>
                            <TextTheme style={{fontWeight: '900', fontSize: 16, marginBottom: 2}}>E Wallet is Open-sorce !</TextTheme>
                            <Text style={{fontWeight: '900', fontSize: 14, color: 'rgb(50,150,250)'}}>https://github.com/Mustak24/E_Wallet</Text>
                        </View>
                    </View>
                </Container>

                <Text style={{paddingLeft: 4, fontWeight: '900', fontSize: 20, marginTop: 24, color: 'rgb(250,50,100)'}}>Danger Zone</Text>

                <Container style={{marginBlock: 14}} backgroundColor="rgb(250,50,100)">
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16}]}>
                        <FeatherIcons name="trash-2" size={26} color={'white'} />
                        <Text style={{fontWeight: '900', fontSize: 16, color: 'white'}}>Delete all Data</Text>
                    </View>
                </Container>


                <View style={{height: 150}}></View>
            </ScrollView>

            <UpdateNameModal visible={isUpdateNameModalVisible} setVisible={setUpdateNameModalVisible} onUpdate={setName} />

        </View>
    )
}


type ContainerProps = {
    children: React.ReactNode,
    backgroundColor?: string,
    style?: ViewStyle,
    onPress?: ()=>void
}

function Container({children, backgroundColor='rgb(25,25,25)', style={}, onPress=()=>{}}: ContainerProps): React.JSX.Element {
    
    return (
        <AnimateButton 
            style={{padding: 20, borderRadius: 20, backgroundColor, width: '100%', overflow: 'hidden', ...style}}
            onPress={onPress}
            scale={30}
        >
            {children}
        </AnimateButton>
    )
}






type UpdateNameModalProps = {
    visible: boolean,
    setVisible: (vis: boolean) => void,
    onUpdate: (name: string) => void,
}

function UpdateNameModal({visible, setVisible, onUpdate}: UpdateNameModalProps): React.JSX.Element {
    
    const {color} = useContext(AppContext);

    const [name, setName] = useState<string>(AppStorage.getString('username') ?? 'Undefined');

    function updateName() {
        if(!name) return;
        AppStorage.set('username', name)
        onUpdate(name);
        setVisible(false);
        setName('');
    }

    return (
        <BottomModal 
            visible={visible} 
            setVisible={setVisible}
            actionButtons={[
                {
                    title: 'Save',
                    backgroundColor: 'rgb(50,200,150)',
                    onPress: updateName
                }
            ]}
            style={{paddingInline: 20}}
        >
            <TextTheme style={{fontWeight: '900', fontSize: 14}}>Edit Name</TextTheme>
            <TextInput  
                value={name}
                onChangeText={setName}
                placeholder="Enter Name..."
                style={{color, fontWeight: 900, fontSize: 28}}
                autoCapitalize="sentences"
                autoFocus={true}
            />
        </BottomModal>
    )
}