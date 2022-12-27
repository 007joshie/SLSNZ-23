import { Divider, Layout, Text, Tab, TabView, TopNavigation, TopNavigationAction, Card, Button, Modal, Icon } from '@ui-kitten/components';
import { ArrowIosBackIcon } from '../assets/icons'
import * as React from 'react'
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, useEffect, StatusBar, Linking} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Triangle from 'react-native-triangle';

export const MedicalScreen = ({ navigation, route }) => {
  
  const navigateBack = () => {
    navigation.goBack();
  };

  const { ScreenID, ModeType } = route.params
  const jsonData = require('../data.json');
  const database = jsonData['First-Aid'].presentation[ScreenID-1]

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [visible, setVisible] = React.useState(false);
  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigateBack}/>
  );
  

   const dialCall = () => {
  
      let phoneNumber = '';
  
      if (Platform.OS === 'android') {
        phoneNumber = 'tel:${111}';
      }
      else {
        phoneNumber = 'telprompt:${111}';
      }
  
      Linking.openURL(phoneNumber);
    };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e31f26'}} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor='#E31F26'/>
      <TopNavigation title={props => <Text {...props} style={[props.style, { color: 'white' }]}>{database.title}</Text>} backgroundColor="#E31F26" alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
    

      {ModeType == 1 ? (
        <>
        <Modal
        visible={visible}
        style={styles.modal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {setVisible(false)}}>
          <TabView indicatorStyle={{backgroundColor: '#e31f26', height: 0}}
      style={{zIndex: 10,  borderWidth: 0}}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='Priorities' style={styles.tabs}>
      <Layout style={{backgroundColor: 'rgba(0,0,0,0)'}}>
        <Layout style={styles.tabContainer} >
          <Layout style={{backgroundColor: 'rgba(0,0,0,0)'}}>
        <Triangle
          style={{alignment: 'center', left: 24}}
            width={43}
            height={19}
            color={'#FFF'}
            direction={'up'}
          />
          </Layout>
          
          <Card style={{marginTop: -1, zIndex: 10,  borderWidth: 0}}>
          {database.priorities.map((n) => 
            <Layout key={n} style={{flexDirection: 'row', paddingVertical: 4}}>
              
            <Text style={{color: '#006BB6'}}>{'\u25a0'}</Text>
            <Text style={{flex: 1, paddingLeft: 8}} category={'p2'}>{boldText(n)}</Text>
          </Layout >)}
          </Card>
          <Layout style={{flex: 1,backgroundColor:'rgba(0,0,0,0)',justifyContent: 'center', alignItems: 'center',
          }}>
          <Icon style={styles.icon} fill='#FFF' name='close-outline' onPress={() => {setVisible(false)}} />
          </Layout>
          </Layout>
        </Layout>
      </Tab>
      <Tab title='Do'>
      <Layout style={{backgroundColor: 'rgba(0,0,0,0)',maxHeight: 500}}>
            <ScrollView>
        <Layout style={styles.tabContainer} >
          <Layout style={{backgroundColor: 'rgba(0,0,0,0)',justifyContent: 'center', alignItems: 'center'}}>
        <Triangle
          style={{alignment: 'center'}}
            width={43}
            height={19}
            color={'#FFF'}
            direction={'up'}
          />
          </Layout>
          
          <Card style={{marginTop: -1,  borderWidth: 0}}>
          <Text category={'p2'} style={{lineHeight:26}}>{boldText(database.do)}</Text>
          </Card>
          </Layout>
          </ScrollView>
          <Layout style={{flex: 1,backgroundColor:'rgba(0,0,0,0)',justifyContent: 'center', alignItems: 'center',
          }}>
          <Icon style={styles.icon} fill='#FFF' name='close-outline' onPress={() => {setVisible(false)}} />
          </Layout>
        </Layout>
      </Tab>
      <Tab title='Think'>
      <Layout style={{backgroundColor: 'rgba(0,0,0,0)'}}>
        <Layout style={styles.tabContainer} >
          <Layout style={{backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row'}}>
        <Triangle
          style={{marginLeft: 'auto', right: 24}}
            width={43}
            height={19}
            color={'#FFF'}
            direction={'up'}
            
          />
          </Layout>
          <Card style={{marginTop: -1, zIndex: 10, borderWidth: 0}}>
          <Text category={'p2'} style={{lineHeight:26}}>{boldText(database.think)}</Text>
          </Card>
          </Layout>
          <Layout style={{flex: 1,backgroundColor:'rgba(0,0,0,0)',justifyContent: 'center', alignItems: 'center',
          }}>
          <Icon style={styles.icon} fill='#FFF' name='close-outline' onPress={() => {setVisible(false)}} />
          </Layout>
        </Layout>
      </Tab>
    </TabView>
      </Modal>
      <Layout style={{zIndex:10, backgroundColor: '#eaf2f8'}}>
      <TabView 
      indicatorStyle={{backgroundColor: 'none', height: 0, color: 'black'}}
      style={{zIndex: 10}}
      selectedIndex={selectedIndex}
      onSelect={index => {setSelectedIndex(index),
      setVisible(true)}}>
      <Tab title='Priorities' style={styles.tabs}>
        <Layout>
        </Layout>
      </Tab>
      <Tab title='Do'>
        <Layout>
        </Layout>
      </Tab>
      <Tab title='Think'>
        <Layout>
        </Layout>
      </Tab>
    </TabView>
    </Layout>
    </>
      ) : ([])}
    <ScrollView 
    fadingEdgeLength={25} 
    scrollIndicatorInsets={{top: 8, left: 0, bottom: 0, right: 0}}
    style={{backgroundColor: '#eaf2f8'}} >
      {ModeType == 2 ? (
        //LEARNING MODE
    <Layout style={{padding:8, backgroundColor: '#eaf2f8'}}>
    <Card style={styles.tasks}>
      <Text category={'h3'} style={{paddingTop: 8,paddingBottom: 12}}>Priorities</Text>
      {database.priorities.map((n) => 
      <Layout style={{flexDirection: 'row', padding: 2}}>
      <Text style={{color: '#006BB6'}}>{'\u25a0'}</Text>
      <Text category={'p2'} key={n} style={{flex: 1, paddingLeft: 5}}>{n}</Text>
    </Layout >)}
    </Card>
    <Card style={styles.tasks}>
    < Text category={'h3'} style={{paddingTop: 8,paddingBottom: 12}}>Do</Text>
      <Text category={'p2'}>{boldText(database.do)}</Text>
    </Card>
    <Card style={styles.tasks}>
    < Text category={'h3'} style={{paddingTop: 8,paddingBottom: 12}}>Think</Text>
      <Text category={'p2'}>{boldText(database.think)}</Text>
    </Card>
    </Layout>
      ) : ([])}
      <Layout style={{backgroundColor: '#eaf2f8'}}>
    <Card style={styles.start}><Text style={{color:'#fff', marginLeft: -10, marginRight:-10, marginVertical:-5}} category='h2'>START</Text></Card>
    <Triangle
          style={{marginLeft:9, marginTop:-10}}
            width={43}
            height={19}
            color={'#285EA1'}
            direction={'down'}
          />
    </Layout>
    {renderStep(database)}
    <Layout style={{backgroundColor: '#eaf2f8'}}>
    <Card style={styles.end}><Text style={{color:'#fff', marginLeft: -10, marginRight:-10, marginVertical:-5}} category='h2'>END</Text></Card>
    </Layout>
    </ScrollView>
    <Layout>
      
    </Layout>
    
    </SafeAreaView>
  );

  function renderStep(database) {
    return (
      <>
        {database.step.map((step) => {
           return <>
           {step.conditional == false ? (
            <Layout style={{backgroundColor: '#eaf2f8'}}><Layout style={{flexDirection: 'row', flex: 0, backgroundColor: '#eaf2f8', paddingTop: 8}}>
            <Card style={styles.numberCol}><Text style={{color: '#fff', marginLeft: -11, marginRight: -12,marginTop: -4}} category={'h3'}>{step.currentCount}</Text></Card>
            <Card style={styles.textCol}>
              <Text style={{margin: -6, lineHeight: 24}} category={'p2'}>{boldText(step.text)}</Text>
              {step.immediateCall == true ? (
                <>
                 <Button style={{marginTop:16, marginHorizontal: -6,backgroundColor: '#006bb6', borderWidth: 0}} size='large' onPress={dialCall}><Text color={'red'}>Tap to Call 111</Text></Button>
                 <Text style={{ color: '#888', paddingTop: 5, marginLeft:-4 }} category={'c1'}>You will be directed to your phones call screen</Text>
                </>
              ) : ([])}
            </Card>
            </Layout>
            <Triangle
            style={{marginLeft:9, marginTop:-2}}
              width={43}
              height={19}
              color={'#285EA1'}
              direction={'down'}
            />
            </Layout> 
           ) : (
            <Layout style={{backgroundColor: '#eaf2f8', marginHorizontal: 4}}><Layout style={{flexDirection: 'row', flex: 1, backgroundColor: '#eaf2f8', paddingTop: 8, }}>
              <Card style={{}}><Card style={{width:'100%', backgroundColor:'#006bb6',borderWidth:0}}><Text style={{color:'white', marginVertical: -4}} category={'s1'}>{boldText(step.text)}</Text></Card>
              <Layout style={{flexDirection: 'row', height:90, marginBottom: -10}}>
              <Button color="#841584" style={{marginTop:16, flex:1, backgroundColor: 'rgba(0,0,0,0)', borderWidth: 4, marginRight:4, marginVertical: 16, borderColor: '#006bb6'}}>{props => <Text {...props} style={[props.style, { color: '#285ea1' }]}>YES</Text>}</Button>
              <Button style={{marginTop:16, flex:1, backgroundColor: 'rgba(0,0,0,0)', borderWidth: 4, marginLeft:4, marginVertical: 16, borderColor: '#006bb6'}}>{props => <Text {...props} style={[props.style, { color: '#285ea1' }]}>NO</Text>}</Button>
              </Layout>
              </Card>
            </Layout>
            </Layout> 
           )}
           </>
           })}
      </>
    );
  }
};

const styles = StyleSheet.create({
  tabContainer: {
    minHeight: 0,
    padding: 16,
    zIndex:100,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  tabs:{
    height:48,
    borderEndColor: "red",
    flex: 1
  },
  start: {
    alignItems:'center',
    width: 125,
    height: 'auto',
    padding:8,
    margin:8,
    backgroundColor: '#006bb6',
    zIndex:0,
    color:'#fff',
    padding: -30,
    margin:8,
    borderRadius:5,
    marginTop: 16,
  },icon: {
    width: 48,
    height: 48,
    marginTop:10,
  },
  end: {
    alignItems:'center',
    width: 100,
    height: 'auto',
    padding:8,
    margin:8,
    backgroundColor: '#006bb6',
    zIndex:0,
    color:'#fff',
    padding: 0,
    margin:8,
    borderRadius:5,
    marginTop: 16,
  },
  step: {
    padding:8,
    margin:8,
    zIndex:0,
  },
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 107, 182, 0.5)',
  },
  modal: {
  width: '100%', 
  position: 'absolute', 
  top: 56,
  borderWidth: 0
  },
  numberCol:{
    flex:0,
    width:45,
    marginLeft:8,
    paddingHorizontal: -16,
    backgroundColor: '#006bb6',
  },
  textCol:{
    color: '#000',
    width: 320,
    paddingLeft: 0,
    left: 10,
    borderWidth: 1,
    },
    tasks: {
      marginBottom: 8      
    },
    callNum: {
      flex:1,
      margin: 30,
      color: 'red',
    }
    
});

// 'Hello ||#FF5843|world||'
export function boldText(str) {
  const navigation = useNavigation();
  return (
    <>
      {str.split('||').map((item) => {
        if (item.indexOf('|') !== -1) {
          const coloredText = item.split('|');
          if(coloredText[0].includes('#')){
            const idLink = coloredText[0].split('#');
            return <Text onPress={() => {navigation.navigate('Medical',
            { ScreenID: idLink[1], ModeType: 2 })}} style={{ textDecorationLine: 'underline', textDecorationColor: '#E31F26', textDecorationStyle:'dashed'}}>{coloredText[1]}</Text>;
          }
          return <Text category={coloredText[0]}>{coloredText[1]}</Text>;
        } else {
          return item;
        }
      })}
    </>
  );
}
