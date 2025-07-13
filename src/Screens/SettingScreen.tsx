import { Animated, Linking, ScrollView, Share, Switch, Text, TextInput, useAnimatedValue, View, ViewStyle } from "react-native";
import SafePaddingView from "../Components/SafeAreaView/SafePaddingView";
import { TextTheme, useTheme } from "../Contexts/ThemeProvider";
import AnimateButton from "../Components/Buttons/AnimateButton";
import DeleteModal from "../Components/Modal/DeleteModal";
import { useAppContext } from "../Contexts/AppContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import style from '../../AppStyle'
import navigator from "../Navigation/NavigationService";
import FeatherIcon from "../Components/Icon/FeatherIcon";
import { AppStorage } from "../Database/Storage";
import BottomModal from "../Components/Modal/BottomModal";
import AccountModal from "../Database/Models/AccountModal";
import TransitionModal from "../Database/Models/TransitionModal";
import { useAlert } from "../Components/Alert/AlertProvider";
import { ItemSelectorModal } from "../Components/Modal/ItemSelectorModal";

export default function SettingScreen(): React.JSX.Element {

    const {username, setAccounts, setTotalBalance, setNeedTransitionRefresh, currency} = useAppContext();
    
    const {primaryColor: color, secondaryBackgroundColor, theme, setTheme} = useTheme();

    const [isUpdateNameModalVisible, setUpdateNameModalVisible] = useState<boolean>(false);
    const [isDeleteDataModalVisible, setDeleteDataModalVisible] = useState<boolean>(false);
    const [isCurrencyModalVisible, setCurrencyModalVisible] = useState<boolean>(false);

    const hearAnimate = useAnimatedValue(0.98);


    return (
        <SafePaddingView fromBottom={false} style={{display: 'flex', alignItems: 'center', paddingInline: 20, width: '100%', height: '100%'}} >
            <View style={[style.flex, style.itemCenter, style.justifyBetween, style.flexRow, style.width100, {paddingBottom: 20}]}>
                <AnimateButton
                    style={{...style.center, width: 44, aspectRatio: 1, borderRadius: 100, borderWidth: 2, borderColor: color}} 
                    onPress={() => navigator.goBack()}
                    >
                    <FeatherIcon name="plus" size={20} color={color} style={{transform: 'rotate(45deg)'}} />
                </AnimateButton>

                <View style={[style.center, style.flexRow, {gap: 4}]}>
                    <TextTheme style={{fontWeight: '900'}}>Build with</TextTheme>
                    <Animated.View style={{transform: [{scale: hearAnimate}]}}>
                        <FeatherIcon name="heart" size={16} color={'rgb(250,50,50)'} />
                    </Animated.View>
                    <TextTheme style={{fontWeight: '900'}}>by @Mustak24</TextTheme>
                </View>
            </View>

            <ScrollView style={[style.width100]} showsVerticalScrollIndicator={false}>
                <TextTheme style={{fontWeight: '900', fontSize: 28}}>Settigns</TextTheme>
                
                <TextTheme style={{opacity: 0.5, paddingLeft: 4, fontWeight: '900', fontSize: 20, marginTop: 24}}>Account</TextTheme>

                <Container 
                    style={{marginBlock: 14}} 
                    onPress={() => setUpdateNameModalVisible(true)}
                    backgroundColor={secondaryBackgroundColor}
                >
                    <TextTheme style={{fontWeight: '900', opacity: 0.6}}>Name</TextTheme>
                    
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16, marginTop: 16}]}>
                        <FeatherIcon name="user" size={26} color={color} />
                        <TextTheme style={{fontWeight: '900', fontSize: 16}}>{username}</TextTheme>
                    </View>
                </Container>
                
                <TextTheme style={{opacity: 0.5, paddingLeft: 4, fontWeight: '900', fontSize: 20, marginTop: 24}}>App</TextTheme>

                <Container 
                    style={{marginBlock: 14}} 
                    onPress={() => {setCurrencyModalVisible(true); console.log('click')}}
                    backgroundColor={secondaryBackgroundColor}
                >
                    <View style={[style.flex, style.itemCenter, style.flexRow, style.justifyBetween]}>
                            <TextTheme style={{fontWeight: '900', fontSize: 16}}>Currency</TextTheme>
                        <View style={[style.flexRow, style.itemCenter, {gap: 8}]} >
                            <TextTheme style={{fontWeight: '900', fontSize: 16}}>{currency}</TextTheme>
                            <FeatherIcon name="arrow-right" size={26} color={color} />
                        </View>
                    </View>
                </Container>


                <TextTheme style={{opacity: 0.5, paddingLeft: 4, fontWeight: '900', fontSize: 20, marginTop: 24}}>Other</TextTheme>

                <Container 
                    style={{marginBlock: 14}} 
                    backgroundColor={secondaryBackgroundColor}
                    onPress={() => setTheme((theme) => theme == 'dark' ? 'light' : 'dark')}
                >
                    <View style={[style.flex, style.itemCenter, style.justifyBetween, style.flexRow]}>
                        <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16}]}>
                            <FeatherIcon name="moon" size={26} color={color} />
                            <TextTheme style={{fontWeight: '900', fontSize: 16, color: 'white'}}>Dark Mode</TextTheme>
                        </View>
                        <Switch 
                            style={{alignSelf: 'flex-end'}} 
                            value={theme == 'dark'} 
                            thumbColor={theme == 'dark' ? 'rgb(50,150,250)' : 'rgb(50,50,50)'}
                            trackColor={{false: 'white', true: 'white'}}
                            onValueChange={(value) => {setTheme(value ? 'dark' : 'light')}} 
                        />
                    </View>
                </Container>

                <Container 
                    style={{marginBlock: 14}} 
                    backgroundColor="rgb(50,150,250)"
                    onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.e_wallet.pixelProphet')}
                >
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16}]}>
                        <FeatherIcon name="star" size={26} color={'white'} />
                        <Text style={{fontWeight: '900', fontSize: 16, color: 'white'}}>Rate us on Google Play</Text>
                    </View>
                </Container>
                
                <Container 
                    style={{marginBlock: 14}} 
                    backgroundColor="rgb(250,50,150)"
                    onPress={async () => {
                        try {
                            await Share.share({
                                message: 'Check out Pixel Wallet ( Android App )\n Download now: https://play.google.com/store/apps/details?id=com.e_wallet.pixelProphet',
                                title: 'E Wallet App'
                            });
                        } catch (error) {
                            console.error('Error sharing:', error);
                        }
                    }}
                >
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16}]}>
                        <FeatherIcon name="share-2" size={26} color={'white'} />
                        <Text style={{fontWeight: '900', fontSize: 16, color: 'white'}}>Share E Wallet</Text>
                    </View>
                </Container>

                <Container 
                    style={{marginBlock: 14}}
                    onPress={() => Linking.openURL('https://mustak24.github.io/Pixel-Wallet-privacy-policy/')}
                    backgroundColor={secondaryBackgroundColor}
                >
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16}]}>
                        <FeatherIcon name="file-text" size={26} color={color} />
                        <TextTheme style={{fontWeight: '900', fontSize: 16}}>Privacy Policy</TextTheme>
                    </View>
                </Container>

                <Container 
                    style={{marginBlock: 14}} 
                    onPress={() => Linking.openURL('https://github.com/Mustak24/Pixel-Wallet')}
                    backgroundColor={secondaryBackgroundColor}
                >
                    <TextTheme style={{fontWeight: '900', opacity: 0.6}}>OPEN SOURCE</TextTheme>
                    
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16, marginTop: 16}]}>
                        <FeatherIcon name="github" size={32} color={color} />
                        <View style={{flex: 1}} >
                            <TextTheme style={{fontWeight: '900', fontSize: 16, marginBottom: 2}}>E Wallet is Open-sorce !</TextTheme>
                            <Text style={{fontWeight: '900', fontSize: 14, color: 'rgb(50,150,250)'}}>
                                https://github.com/Mustak24/Pixel-Wallet
                            </Text>
                        </View>
                    </View>
                </Container>

                <Text style={{paddingLeft: 4, fontWeight: '900', fontSize: 20, marginTop: 24, color: 'rgb(250,50,100)'}}>Danger Zone</Text>

                <Container onPress={() => setDeleteDataModalVisible(true)} style={{marginBlock: 14}} backgroundColor="rgb(250,50,100)">
                    <View style={[style.flex, style.itemCenter, style.flexRow, {gap: 16}]}>
                        <FeatherIcon name="trash-2" size={26} color={'white'} />
                        <Text style={{fontWeight: '900', fontSize: 16, color: 'white'}}>Delete all Data</Text>
                    </View>
                </Container>


                <View style={{height: 150}}></View>
            </ScrollView>

            <UpdateNameModal visible={isUpdateNameModalVisible} setVisible={setUpdateNameModalVisible} />
           
            <DeleteModal 
                visible={isDeleteDataModalVisible} setVisible={setDeleteDataModalVisible} 
                passkey={username}
                massage="Once you delete a Data, there is no going back."
                handleDelete={() => {
                    AccountModal.getAll().forEach(acc => AccountModal.deleteById(acc.id));
            
                    TransitionModal.getAll().forEach(tra => TransitionModal.deleteById(tra.id));

                    AccountModal.create({name: 'Cash', balance: 0, backgroundColor: 'rgb(25,200,150)'});
                    AccountModal.create({name: 'Bank', balance: 0, backgroundColor: 'rgb(130,100,255)'});
                    
                    setAccounts(AccountModal.getAll());
                    setTotalBalance(AccountModal.getTotalBalance());
                    setNeedTransitionRefresh(pre => ++pre)
                    setDeleteDataModalVisible(false);

                    navigator.goBack();
                }}
            />
        
            <CurrencyModal
                visible={isCurrencyModalVisible} setVisible={setCurrencyModalVisible}
            />
        </SafePaddingView>
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
            bubbleScale={30}
        >
            {children}
        </AnimateButton>
    )
}



type UpdateNameModalProps = {
    visible: boolean,
    setVisible: (vis: boolean) => void
}

function UpdateNameModal({visible, setVisible}: UpdateNameModalProps): React.JSX.Element {
    
    const {setAlert} = useAlert()
    const {setUsername} = useAppContext();
    const {primaryColor: color} = useTheme();

    const [name, setName] = useState<string>(AppStorage.getString('username') ?? 'Undefined');

    function updateName() {
        if(!name) {
            setAlert({id: 'username-modal', type: 'error', massage: 'Please enter username !!!'})
            return;
        }
        AppStorage.set('username', name);

        setUsername(name);
        setVisible(false);
        setName('');
    }

    return (
        <BottomModal
            alertId="username-modal"
            visible={visible} 
            setVisible={setVisible}
            actionButtons={[
                {
                    title: 'Save',
                    backgroundColor: 'rgb(15,150,100)',
                    onPress: updateName,
                    icon: <FeatherIcon name="save" size={20} color={'white'} />
                }
            ]}
            style={{paddingInline: 20}}
        >
            <TextTheme style={{fontWeight: '900', fontSize: 14}}>Edit Name</TextTheme>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter Name..."
                placeholderTextColor={color}
                style={{color, fontWeight: 900, fontSize: 28, opacity: name ? 1 : 0.5}}
                autoCapitalize="sentences"
                autoFocus={true}
            />
        </BottomModal>
    )
}


function CurrencyModal({ visible, setVisible }: { visible: boolean, setVisible: Dispatch<SetStateAction<boolean>> }): React.JSX.Element {
    type currencyInfo = {currency: string, country: string, currency_name: string}

    const { currency, setCurrency } = useAppContext();
    
    const currencyData: currencyInfo[] = require('../Assets/Jsons/currency-data.json');
    const selected = (currencyData.find(item => item.currency === currency) ?? null);
    
    function udpateCurrency(currencyInfo: currencyInfo){
        setCurrency(currencyInfo.currency);
    }
    
    useEffect(() => {
        console.log(currencyData, visible)
    }, [currencyData])

    return (
        <ItemSelectorModal<currencyInfo>
            visible={visible}
            setVisible={setVisible}
            title='Select Currency'
            onSelect={udpateCurrency}
            allItems={currencyData}
            selected={selected}
            keyExtractor={(item) => item.country + item.currency}
            filter={(item, val) => (
                item.country.toLowerCase().startsWith(val) || 
                item.currency.toLowerCase().startsWith(val)
            )}
            SelectedItemContent={
                <View>
                    <TextTheme color="white" style={{fontWeight: 400, fontSize: 14}} >
                        {selected?.currency_name}
                    </TextTheme>
                    <TextTheme color="white" style={{fontWeight: 400, fontSize: 16}} >
                        {selected?.currency}
                    </TextTheme>
                </View>
            }

            renderItemContent={(item) => (<>
                    <TextTheme style={{fontWeight: 900, fontSize: 16}}>{item.country}</TextTheme>
                    <TextTheme style={{fontWeight: 600, fontSize: 16}}>{item.currency}</TextTheme>
            </>)}
        />
    );
}