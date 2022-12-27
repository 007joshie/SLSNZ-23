import { ArrowIosBackIcon, MenuIcon } from '../assets/icons';
import { Divider, Layout, Text, TopNavigation, TopNavigationAction, Card, Button } from '@ui-kitten/components';
import { StyleSheet, Dimensions, StatusBar, Animated } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions, } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'react-native';

export const CallScreen = () => {
  const navigation = useNavigation();

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
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

  const phoneManage = () => {
    Linking.openURL('tel:111');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e31f26'}} edges={['top']}>
       <StatusBar barStyle="light-content" backgroundColor='#E31F26'/>
      <TopNavigation title={props => <Text {...props} style={[props.style, { color: 'white' }]}>Call Emergency Services</Text>} backgroundColor="#E31F26" alignment='center' accessoryLeft={renderDrawerAction}/>
      <Divider/>
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: '#eaf2f8'}}>
      <Layout style={{ padding: 8, backgroundColor: '#eaf2f8'}}>
            
          <Card style={styles.card}>
            <Text style={{ color: 'black' }} category={'h6'}>Is it an emergency?</Text>
              <Text style={{ color: 'black', paddingTop: 4 }} category={'p2'}>
              You can call 111 emergency call in situations such as:
fire
medical emergency
someone is badly injured or in danger
a serious risk to life or property
a crime is being committed and the offenders are still there or have just left
you have come across a major public disruption, like trees blocking a road
a dangerous situation is happening now or has just happened.</Text>
          </Card>
          <Card style={{flex: 1,
    marginRight:0,
    padding:0,
    paddingVertical: 8,
    marginTop: 8,
    left: 0,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    backgroundColor: 'white'}}>
            <Text style={{ color: 'black', marginBottom:16 , }} category={'h3'}>Emergency Services</Text>
            <Button style={styles.buttonStyle} onPress={phoneManage} size={'giant'}>Call 111</Button>
            <Text style={{ color: 'black', paddingTop: 5, paddingLeft:1 }} category={'c1'}>You will be directed to your phones call screen</Text>
          </Card>
          <Card style={styles.card}>
            <Text style={{ color: 'black' }} category={'h6'}>HI</Text>
              <Text style={{ color: 'black', paddingTop: 4 }} category={'p2'}>HI</Text>
          </Card>
          <Card style={styles.card}>
            <Text style={{ color: 'black' }} category={'h6'}>HI</Text>
              <Text style={{ color: 'black', paddingTop: 4 }} category={'p2'}>HI</Text>
          </Card>
          <Card style={styles.card}>
            <Text style={{ color: 'black' }} category={'h6'}>HI</Text>
              <Text style={{ color: 'black', paddingTop: 4 }} category={'p2'}>HI</Text>
          </Card>
          <Card style={styles.card}>
            <Text style={{ color: 'black' }} category={'h6'}>HI</Text>
              <Text style={{ color: 'black', paddingTop: 4 }} category={'p2'}>HI</Text>
          </Card>
          <Card style={styles.card}>
            <Text style={{ color: 'black' }} category={'h6'}>HI</Text>
              <Text style={{ color: 'black', paddingTop: 4 }} category={'p2'}>HI</Text>
          </Card>
          <Card style={styles.card}>
            <Text style={{ color: 'black' }} category={'h6'}>HI</Text>
              <Text style={{ color: 'black', paddingTop: 4 }} category={'p2'}>HI</Text>
          </Card>
          </Layout>
          </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    backgroundColor: '#006bb6',
    flex:1,
    borderWidth:0,
    borderColor:'white'
  },
  card: {
    flex: 1,
    marginRight:0,
    padding:0,
    paddingVertical: 8,
    marginTop: 8,
    left: 0,
    backgroundColor: 'white',
    borderWidth: 0,
  }});
