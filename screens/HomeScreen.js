import { Button, Divider, Layout, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';
import { useState, useEffect } from 'react';
import { MenuIcon } from "../assets/icons";
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Icon, List, ListItem, Card, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { StyleSheet, Dimensions, StatusBar, Animated } from 'react-native';
import QuickScrollList from 'react-native-quick-scroll';
import CustomSwitch from '../Switch';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native-web';
import Toast from 'react-native-toast-message';
import Position from 'react-native/Libraries/Components/Touchable/Position';

import { TouchableWithoutFeedback } from 'react-native';

const SCREEEN_HEIGHT = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const FOOTER_HEIGHT = 64;
const VIEWPORT_HEIGHT = Dimensions.get('window').height + 45;
const ITEM_HEIGHT = 75;

var ModeType = 1;

export const HomeScreen = () => {

// Index 1: emergency
// Index 2: learning
  const onSelectSwitch = index => {
    try {
      ModeType = index;
      Toast.hide()
      if (ModeType == 1) {
        Toast.show({
          type: 'SLSToast',
          text1: 'Emergency Mode',
          text2: 'Prioritises step-by-step information',
          position: 'bottom',
          bottomOffset: 0
        });
      }
      if (ModeType == 2){
        Toast.show({
          type: 'SLSToast',
          text1: 'Learning Mode',
          text2: 'Casual layout of information',
          position: 'bottom',
          bottomOffset: 0
        });
      }
    } catch (e) {
      // saving error
    }
  };

    const DATA = [
        {
          id: '1',
          title: 'The DRSABCD Approach',
          description: 'Assessment and basic life support'
        },
        {
          id: '2',
          title: 'Recognising Shock',
          description: 'Insufficient oxygenated blood to the body.'
        },
        {
          id: '3',
          title: 'The Unconscious Patient',
          description: ''
        },
        {
          id: '4',
          title: 'Drowning',
          description: 'Submersion/immersion in liquid.'
        },
        {
            id: '5',
            title: 'Asthma',
            description: 'Acute shortness of breath'
          },
          {
            id: '6',
            title: 'Anaphylaxis',
            description: 'Allergic reaction affecting airway'
          },
          {
            id: '7',
            title: 'Choking',
            description: 'airway obstruction'
          },
          {
            id: '8',
            title: 'Chest pain and Heart Attack ',
            description: 'Blockage of supplying the heart with oxygen'
          },
          {
            id: '9',
            title: 'Stroke',
            description: 'Blockage of blood flow to part of the brain'
          },
          {
            id: '10',
            title: 'Seizure',
            description: 'Sudden uncontrolled electrical discharges'
          },
          {
            id: '11',
            title: 'Intoxication and Overdose',
            description: 'Excessive exposure to a substance'
          },
          {
            id: '12',
            title: 'Hypothermia',
            description: 'body temperature <35°C'
          },
          {
            id: '13',
            title: 'Heat Exhaustion and Heat Stroke',
            description: 'high body temperature >38°C'
          },
          {
            id: '14',
            title: 'Burns',
            description: 'Damage caused to skin '
          },
          {
            id: '15',
            title: 'Bleeding and Wounds',
            description: 'Damage caused to skin '
          },
          {
            id: '16',
            title: 'Fractures and Dislocations',
            description: ''
          },
          {
            id: '17',
            title: 'Head injury / Concussion',
            description: ''
          },
          {
            id: '18',
            title: 'Neck and Spinal injury',
            description: ''
          },
          {
            id: '19',
            title: 'Lifeguard Health, Wellbeing, and Safety',
            description: ''
          },
          {
            id: '20',
            title: 'Needlestick and Body-Fluid Exposure',
            description: ''
          },
          {
            id: '21',
            title: 'Patient Handover',
            description: ''
          },
          
      ];

      const StarIcon = (props) => (
        <Icon {...props} name='star'/>
      );
    
  const [scrollY] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const navigateDetails = () => {
    navigation.navigate('About');
  };

  const renderItemAccessory = (props) => (
    <Button style={{backgroundColor:'#006bb6', borderWidth: 0}} size='giant'>></Button>
  );



  const showToast = () => {
    Toast.show({
      type: 'SLSToast',
      text1: 'Hello',
      text2: 'This is some something 👋',
      position: 'bottom'
    });
  }

  const toastConfig = {
    SLSToast: ({ text1,text2, props }) => (
      <Layout style={{ height: 150, width: '100%', backgroundColor: 'rgba(0,0,0,0)', 
      shadowColor: '#655300',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 8,  
      elevation: 5,
      borderRadius: 10}}>
        <Card style={{padding: -8, marginHorizontal: 8, backgroundColor: '#ffd200', borderWidth: 0, marginVertical: 24}}>

        <Layout style={{flexDirection:'row', backgroundColor: '#ffd200', margin: 0}}><Icon
        fill='#000'
        style={styles.icon}
        name='alert-circle'
        />
        <Layout style={{paddingLeft: 16, backgroundColor: '#ffd200'}}>
          <Text category={'h3'}>{text1}</Text>
          <Text style={{paddingTop: 4}} category={'p2'}>{text2}</Text>
          
          </Layout>
          </Layout>
          </Card>
      </Layout>
    )
  }

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(DATA);

  const onSelect = (index) => {
    setValue(data[index].title);
    navigation.navigate('Medical',
          { ScreenID: index+1, ScreenTitle: data[index].title, ModeType: ModeType })
    clearInput();      
  };

  const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );

  const clearInput = () => {
    setValue('');
    setData(DATA);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(DATA.filter(item => filter(item, query)));
  };

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name='close'/>
    </TouchableWithoutFeedback>
  );

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
      style={{padding: 4}}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e31f26'}} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor='#E31F26'/>
        <TopNavigation
            title={props => <Text {...props} style={[props.style, { color: '#FFFFFF' }]}><CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={'Emergency'}
          option2={'Learning'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={'#e31f26'}
        /> </Text>}
          alignment="center"
          accessoryLeft={renderDrawerAction}
          backgroundColor="#E31F26"
        />
        
      <Divider/>

      <Layout style={{ flex: 0, backgroundColor: '#eaf2f8'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={{}}>
        {/* {DATA.map(item => 
          <Card key={item.id} style={styles.card} appearance={"filled"}>
          <ListItem style={styles.listitem}
        title={props => <Text {...props} style={[props.style, { color: 'black' }]} category={'p1'}>{item.title}</Text>}
        description={`${item.description}`}
        onPress={() =>  navigation.navigate('Medical',
        { ScreenID: item.id, ScreenTitle: item.title, ModeType: ModeType })}
        accessoryRight={renderItemAccessory}
          />
          </Card>) } */}

        <Autocomplete
          placeholder='Search'
          style={{padding: 8, borderWidth: 0, height: 56}}
          value={value}
          accessoryRight={renderCloseIcon}
          onChangeText={onChangeText}
          onSelect={onSelect}>
          {data.map(renderOption)}
        </Autocomplete>
        
        <Divider/>

          {DATA.map(item => 
          <Layout style={{flexDirection: 'row', padding: 8, backgroundColor: '#eaf2f8'}}>
            
          <Card key={item.id} style={styles.card} appearance={"filled"} onPress={() =>  navigation.navigate('Medical',
          { ScreenID: item.id, ScreenTitle: item.title, ModeType: ModeType })}>
            <Text style={{ color: 'black' }} category={'h6'}>{item.title}</Text>
            {item.description.length > 0 ? (
              <Text style={{ color: 'black', paddingTop: 4 }} category={'p2'}>{item.description}</Text>
             ) : ([])} 
          </Card>
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
          }} onPress={() =>  navigation.navigate('Medical',
          { ScreenID: item.id, ScreenTitle: item.title, ModeType: ModeType })}>{evaProps => <Text {...evaProps} category='h2' style={{color: "white"}}>></Text>}</Button>
          </Layout>
          ) }
        <Layout height={150} style={{backgroundColor: '#eaf2f8', paddingHorizontal: 32, paddingVertical: 22, textAlign: 'center'}}>
          <Text category={'label'} style={{ color: '#A0A0A0', textAlign: 'center'}}>First Aid content written by Surf Life Saving New Zealand Medical Advisory Group</Text>
        </Layout>
      </ScrollView>
      </Layout>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    marginRight:0,
    padding:0,
    paddingVertical: 8,
    left: 0,
    backgroundColor: 'white',
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
  }
});