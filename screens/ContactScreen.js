import { ArrowIosBackIcon, MenuIcon } from '../assets/icons';
import { Icon, Divider, ButtonGroup, Layout,Autocomplete,AutocompleteItem,Text, TopNavigation, TopNavigationAction, Tooltip, Button, Card} from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, Platform, StatusBar, Animated } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { Host, Portal } from 'react-native-portalize';
import * as Linking from 'expo-linking';


import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export const ContactScreen = () => {

  const jsonData = require('../clubs.json');
  const SLSNZ = jsonData['lifesaving']


  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const modalizeRef = useRef(null);

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(SLSNZ);

  const onOpen = (item) => {
    modalizeRef.current?.open();
    setSelectedIndex(item)
  };

  const onSelect = (index) => {
    modalizeRef.current?.open();
    setSelectedIndex(index)
    Keyboard.dismiss()      
  };

  

  const handleOnSelectedItem = (item) => {
    setSelectedIndex(item);
  };

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );
  
  
  const styles = StyleSheet.create({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      flex: 1,
      marginRight:0,
      padding:0,
      paddingVertical: 8,
      left: 0,
      backgroundColor: 'white'
    },
    container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "#eaf2f8",
    },
    icon: {
      width: 32,
      height: 32,
    },
    listitem: {
      padding:0,
      margin: -10,
      marginHorizontal: -24,
      marginVertical: 0,
      maxHeight:48,
    },
    buttonGroup: {
      margin: 8,
    },
    buttonStyle: {
      backgroundColor: '#006bb6',
      flex:1,
      borderWidth:0,
      borderColor:'white'
    }
  })


  const filter = (item, query) => item.club.clubName.toLowerCase().includes(query.toLowerCase());

  const clearInput = () => {
    setValue('');
    setData(SLSNZ);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(SLSNZ.filter(item => filter(item, query)));
  };

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name='close'/>
    </TouchableWithoutFeedback>
  );

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.club.clubName}
      style={{padding: 4}}
    />
  );

  const phoneManage = (telNumeber) => {
    Linking.openURL('tel:'+ telNumeber);
  };

  const emailManage = (emailAddress) => {
    Linking.openURL('mailto:'+ emailAddress);
  };

  const webManage = (webAddress) => {
    Linking.openURL(webAddress);
  };

  const openMap = async (address) => {
    const destination = encodeURIComponent(`${address}`);  
    const provider = Platform.OS === 'ios' ? 'apple' : 'google'
    const link = `http://maps.${provider}.com/?daddr=${destination}`;

    try {
        const supported = await Linking.canOpenURL(link);

        if (supported) Linking.openURL(link);
    } catch (error) {
        console.log(error);
    }
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e31f26'}} edges={['top']}>
      <Host>
       <StatusBar barStyle="light-content" backgroundColor='#E31F26'/>
      <TopNavigation title={props => <Text {...props} style={[props.style, { color: 'white' }]}>Contact</Text>} backgroundColor="#E31F26" alignment='center' accessoryLeft={renderDrawerAction}/>
      <Divider/>
      <Layout style={{ flex: 1, backgroundColor: '#eaf2f8'}}>
      <Autocomplete
          placeholder='Search'
          style={{padding: 8, borderWidth: 0, height: 56}}
          value={value}
          accessoryRight={renderCloseIcon}
          onChangeText={onChangeText}
          onSelect={onSelect}>
          {SLSNZ.map(renderOption)}
        </Autocomplete>
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={{}}>
      <>
      <Portal>
        <Modalize ref={modalizeRef} overlayStyle={{backgroundColor:'rgba(0, 107, 182, 0.4)'}} modalStyle={{borderTopLeftRadius:16,borderTopRightRadius:16}} adjustToContentHeight FooterComponent={<Layout style={{height:10}}/>}>
        <Layout style={{padding: 16, minHeight:300, borderRadius:32}}><Text style={{paddingTop:18}} category={'h3'}>{SLSNZ[selectedIndex].club.clubName}</Text>
        
        <Text style={{marginTop:24, marginBottom: 8 }}>Club:</Text>
        <ButtonGroup style={{ width: '100%'}}size='giant'>
        {SLSNZ[selectedIndex].club.phone != "" ? (
          <Button style={styles.buttonStyle} onPress={() => phoneManage(SLSNZ[selectedIndex].club.phone)}>Phone</Button>
        ) : ([])}
        {SLSNZ[selectedIndex].club.email != "" ? (
          <Button style={styles.buttonStyle} onPress={() => emailManage(SLSNZ[selectedIndex].club.email)}>Email</Button>
        ) : ([])}
        {SLSNZ[selectedIndex].club.website != "" ? (
          <Button style={styles.buttonStyle} onPress={() => webManage(SLSNZ[selectedIndex].club.website)}>Website</Button>
        ) : ([])}
        </ButtonGroup>

        
        {SLSNZ[selectedIndex].club.address.physical != "" ? (
          <>
          <Text style={{marginTop:24, marginBottom: 8 }}>Address:</Text>
          <Button style={styles.buttonStyle} onPress={() => openMap(SLSNZ[selectedIndex].club.address.physical)}>{SLSNZ[selectedIndex].club.address.physical}</Button>
          </>
        ) : ([])}

        {SLSNZ[selectedIndex].club.contact[0].name != "" ? (
          <>
          <Text style={{marginTop:24, marginBottom: 8 }}>Details:</Text>
          <Button style={styles.buttonStyle}>{SLSNZ[selectedIndex].club.contact[0].name}</Button>
          </>
        ) : ([])} 
        
        </Layout>
        </Modalize>
      </Portal>
    </>
      {SLSNZ.map(item => 
          <Layout style={{flexDirection: 'row', padding: 8, backgroundColor: '#eaf2f8'}}>
          <Button 
          size={'giant'}
          style={{
            backgroundColor: '#006bb6',
            borderColor:'#006bb6',
            shadowColor: '#006bb6',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 8,  
            elevation: 5,
          }} onPress={() => onOpen(item.club.id)}>{evaProps => <Text {...evaProps} category='h2' style={{color: "white"}}>?</Text>}</Button>  
          <Card key={item.id} style={styles.card} appearance={"filled"} onPress={() => onOpen(item.club.id)}>
            <Text style={{ color: 'black' }} category={'h6'}>{item.club.clubName}</Text>
            {item.club.address.physical.length > 0 ? (
              <Text style={{ color: 'black', paddingTop: 4 }} category={'p2'}>{item.club.address.physical.split(',').pop().trim()}</Text>
             ) : ([])} 
          </Card>
          
          </Layout>
          ) }
          </ScrollView>
          </Layout>
          </Host>
    </SafeAreaView>
  );
};

