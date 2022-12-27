import * as eva from '@eva-design/eva';
import * as Font from 'expo-font'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { useState } from 'react';
import { AppNavigator } from './navigation/AppNavigator.js';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { default as mapping } from './mapping.json'; // <-- Import app mapping
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { LogBox } from "react-native"

const loadFonts = () => {
  return Font.loadAsync({
    'HelveticaNeue-Black': require('./assets/fonts/HelveticaNeue-Black.ttf'),
    'HelveticaNeue-Bold': require('./assets/fonts/HelveticaNeue-Bold.ttf'),
    'HelveticaNeue-Medium': require('./assets/fonts/HelveticaNeue-Medium.ttf'),
    'HelveticaNeue': require('./assets/fonts/HelveticaNeue.ttf'),
    'HelveticaNeue-Light': require('./assets/fonts/HelveticaNeue-Light.ttf'),
  })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  // ENABLE DEBUGGING BY COMMENTING BELOW CODE
  // IGNORED DUE TO PRESENTATION OF THE APP
  LogBox.ignoreAllLogs(true)

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
  <>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={eva.light}
    customMapping={mapping}>
        <SafeAreaProvider>
            <AppNavigator />
        </SafeAreaProvider>
    </ApplicationProvider>
  </>
)}