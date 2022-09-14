import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import BottomTabBar from './components/Navigation/BottomNav/BottomTabBar';
import Home from './screens/Home/Home';
import Program from './screens/Program/Program';
import { Colors, Spacing } from './styles/core';
import PortalProvider from './components/Portal/PortalProvider';
import PortalHost from './components/Portal/PortalHost';
import CreateWorkout from './components/Workout/CreateWorkout';
import FormSheetHeader from './components/Navigation/Headers/FormSheetHeader';
import WorkoutFromTemplate from './screens/Workout/WorkoutFromTemplate';
import {
  RootStackParamList,
  RootTabParamList,
} from './types/Navigator/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Workout from './screens/Workout/Workout';
import AddWorkoutButton from './components/Navigation/AddWorkoutButton';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Routines"
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Routines" component={Home} />
      <Tab.Screen
        name="Workouts"
        component={Workout}
        options={({ navigation }) => ({
          headerRight: () => <AddWorkoutButton navigation={navigation} />,
        })}
      />
      <Tab.Screen name="Stats" component={Program} />
      <Tab.Screen name="Program" component={Program} />
    </Tab.Navigator>
  );
}

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
        <SafeAreaView style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateWorkoutFromTemplate"
              component={WorkoutFromTemplate}
              options={{
                animation: 'slide_from_bottom',
                presentation: 'formSheet',
                header: FormSheetHeader,
                contentStyle: { backgroundColor: Colors.background },
              }}
            />
            <Stack.Screen
              name="CreateWorkout"
              component={CreateWorkout}
              options={{
                animation: 'slide_from_bottom',
                presentation: 'formSheet',
                header: FormSheetHeader,
                contentStyle: { backgroundColor: Colors.background },
              }}
            />
          </Stack.Navigator>
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
  contentContainer: {
    flex: 1,
    paddingTop: Spacing.xs,
  },
});
