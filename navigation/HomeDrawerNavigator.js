import {
  Avatar,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {
  HomeIcon,
  InfoIcon,
} from '../assets/icons';

import { AboutScreen } from '../screens/AboutScreen';
import { BottomTabsNavigator } from './BottomTabsNavigator'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

const { Navigator, Screen } = createDrawerNavigator();
 
const DrawerContent = ({ navigation, state }) => {
    const styles = useStyleSheet(themedStyles);  
    
    const Header = () => (   
      <Layout style={styles.header}>
          <View style={styles.profileContainer}>
            <Text style={styles.profileName} category="h6">
              Surf Life Saving New Zealand
            </Text>
          </View>
        </Layout>
    );

  return (
    <SafeAreaView>
      <Drawer
        header={Header}        
          selectedIndex={new IndexPath(state.index)}
          onSelect={index => navigation.navigate(state.routeNames[index.row])}> 
          <DrawerItem title='Home' accessoryLeft={HomeIcon}/>
          <DrawerItem title='About' accessoryLeft={InfoIcon}/>
        </Drawer>
    </SafeAreaView>
  )
};

export const HomeDrawerNavigator = () => (
  <Navigator screenOptions={{
    headerShown: false
    }} drawerContent={props => <DrawerContent {...props}/>}>
    <Screen name='Home' component={BottomTabsNavigator}/>
    <Screen name='About' component={AboutScreen}/>
  </Navigator>
);

 const themedStyles = StyleService.create({  
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 16,
  },
  
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
}); 
