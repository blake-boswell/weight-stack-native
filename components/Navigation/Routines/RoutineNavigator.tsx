import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Routines from '../../../screens/Routines/Routines';
import Workout from '../../../screens/Workout/Workout';
import { Colors } from '../../../styles/core';
import { RoutineStackParamList } from '../../../types/Navigator/RootNavigator';
import CreateRoutine from '../../Routines/CreateRoutine';
import EditRoutine from '../../Routines/EditRoutine';
import FormSheetHeader from '../Headers/FormSheetHeader';
import RoutineHeader from '../Headers/RoutineHeader';

const Stack = createNativeStackNavigator<RoutineStackParamList>();

const RoutineNavigator = () => {
  return (
    <Stack.Navigator id="RoutineNavigator">
      <Stack.Screen
        name="Main"
        options={() => ({
          header: RoutineHeader,
        })}
        component={Routines}
      />
      <Stack.Screen
        name="CreateRoutine"
        component={CreateRoutine}
        options={{
          animation: 'slide_from_bottom',
          presentation: 'formSheet',

          header: FormSheetHeader,
          contentStyle: { backgroundColor: Colors.background },
          gestureDirection: 'vertical',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="EditRoutine"
        component={EditRoutine}
        options={({ route }) => ({
          headerTitle: route.params.name,
          animation: 'slide_from_bottom',
          // presentation: 'fullScreenModal',

          header: FormSheetHeader,
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          gestureDirection: 'vertical',
          gestureEnabled: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default RoutineNavigator;
