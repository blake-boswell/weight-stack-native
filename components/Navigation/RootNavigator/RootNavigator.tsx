import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../../../styles/core';
import { RootStackParamList } from '../../../types/Navigator/RootNavigator';
import ActiveWorkout from '../../Workout/ActiveWorkout';
import FormSheetHeader from '../Headers/FormSheetHeader';
import TabNavigator from '../TabNavigator/TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootNavigator"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="ActiveWorkout"
          component={ActiveWorkout}
          options={{
            animation: 'slide_from_bottom',
            header: FormSheetHeader,
            contentStyle: { backgroundColor: Colors.background },
            gestureDirection: 'vertical',
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
