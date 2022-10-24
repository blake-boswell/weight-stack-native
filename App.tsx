import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import BottomTabBar from './components/Navigation/BottomNav/BottomTabBar';
import Home from './screens/Home/Home';
import Program from './screens/Program/Program';
import PortalProvider from './components/Portal/PortalProvider';
import PortalHost from './components/Portal/PortalHost';
import { RootTabParamList } from './types/Navigator/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Workout from './screens/Workout/Workout';
import NavigationHeader from './components/Navigation/Headers/NavigationHeader';
import WorkoutNavigator from './components/Navigation/Workout/WorkoutNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
          ...Ionicons.font,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <PortalProvider>
        <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
          <Tab.Navigator
            id="TabNav"
            initialRouteName="Routines"
            tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
            screenOptions={({ navigation }) => ({
              headerShown: false,
            })}
            backBehavior="none"
          >
            <Tab.Screen name="Routines" component={Home} />
            <Tab.Screen name="Workouts" component={WorkoutNavigator} />
            <Tab.Screen name="Stats" component={Program} />
            <Tab.Screen name="Program" component={Program} />
          </Tab.Navigator>
          <PortalHost name="root" />
        </SafeAreaView>
      </PortalProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
