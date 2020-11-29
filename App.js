// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Fragment } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import TopNav from './components/TopNav';
import BottomTabBar from './components/BottomTabBar';
import Home from './screens/Home';
import Logs from './screens/Logs';
import Program from './screens/Program';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
    <NavigationContainer>
      <View style={styles.container}>
        <TopNav />
        <ScrollView style={styles.contentContainer}>
        </ScrollView>
        <Tab.Navigator initialRouteName="Logs" tabBar={props => <BottomTabBar {...props} />}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Logs" component={Logs} />
          <Tab.Screen name="Program" component={Program} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 8,
  },
})

