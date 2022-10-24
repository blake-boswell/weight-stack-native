import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Workout from '../../../screens/Workout/Workout';
import { Colors } from '../../../styles/core';
import { WorkoutStackParamList } from '../../../types/Navigator/RootNavigator';
import CreateWorkout from '../../Workout/CreateWorkout';
import FormSheetHeader from '../Headers/FormSheetHeader';
import WorkoutHeader from '../Headers/WorkoutHeader';

const Stack = createNativeStackNavigator<WorkoutStackParamList>();

const WorkoutNavigator = () => {
  return (
    <Stack.Navigator id="WorkoutNavigator">
      <Stack.Screen
        name="Main"
        options={() => ({
          header: WorkoutHeader,
        })}
        component={Workout}
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
  );
};

export default WorkoutNavigator;
