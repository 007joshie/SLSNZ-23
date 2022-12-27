import { FirstAid, PhoneCall, Bell } from '../assets/icons';
import { BottomNavigation, BottomNavigationTab, Divider } from '@ui-kitten/components';

import { HomeScreen } from '../screens/HomeScreen';
import React from 'react';
import { CallScreen } from '../screens/CallScreen';
import { MedicalScreen } from '../screens/MedicalScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <SafeAreaView style={{backgroundColor: 'white'}} edges={['right', 'bottom', 'left']}>
        <Divider/>
        <BottomNavigation
            appearance='noIndicator'
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab title='First Aid' icon={FirstAid}/>
            <BottomNavigationTab title='Call 111' icon={PhoneCall}/>
            <BottomNavigationTab title='Contact' icon={Bell}/>
        </BottomNavigation>
    </SafeAreaView>
  
);

export const BottomTabsNavigator = () => (
  <Navigator screenOptions={{
    headerShown: false
    }} tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='First Aid' component={HomeScreen}/>
    <Screen name='Call' component={CallScreen}/>
    <Screen name='Contact' component={ContactScreen}/>
    <Screen name='Medical' component={MedicalScreen}/>
  </Navigator>
);
