import { HomeDrawerNavigator } from './HomeDrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { DetailsScreen, MedicalScreen } from '../screens/MedicalScreen'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator screenOptions={{headerShown: null}}>
      <Screen name={'Drawer'} component={HomeDrawerNavigator}/>
    </Navigator>
  </NavigationContainer>
);
