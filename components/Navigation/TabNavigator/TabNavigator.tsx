import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../../types/Navigator/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabBar from './BottomTabBar';
import RoutineNavigator from '../Routines/RoutineNavigator';
import WorkoutNavigator from '../Workout/WorkoutNavigator';
import Program from '../../../screens/Program/Program';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    // <NavigationContainer>
    //   <SafeAreaView style={styles.container}>
    <Tab.Navigator
      id="TabNav"
      initialRouteName="Routines"
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
      backBehavior="none"
    >
      <Tab.Screen name="Routines" component={RoutineNavigator} />
      <Tab.Screen name="Workouts" component={WorkoutNavigator} />
      <Tab.Screen name="Stats" component={Program} />
      <Tab.Screen name="Program" component={Program} />
    </Tab.Navigator>
    //   </SafeAreaView>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TabNavigator;
