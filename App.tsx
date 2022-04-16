import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import BottomTabBar from './components/Navigation/BottomNav/BottomTabBar';
import Home from './screens/Home/Home';
import Program from './screens/Program/Program';
import { Spacing } from './styles/core';
import PortalProvider from './components/Portal/PortalProvider';
import PortalHost from './components/Portal/PortalHost';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <PortalProvider>
        <View style={styles.container}>
          <Tab.Navigator
            initialRouteName="Home"
            tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Workouts" component={Home} />
            <Tab.Screen name="Stats" component={Program} />
            <Tab.Screen name="Program" component={Program} />
          </Tab.Navigator>
          <PortalHost name="root" />
        </View>
      </PortalProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: Spacing.xs,
  },
});
