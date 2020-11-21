// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Fragment } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, ScrollView } from 'react-native';

import TopNav from './components/TopNav';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loading () {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setIsReady(true);
    }

    loading();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }


  return (
    <Fragment>

      <TopNav />
      <ScrollView>
        <Text>Welcome!</Text>
      </ScrollView>
    </Fragment>
  );
}


