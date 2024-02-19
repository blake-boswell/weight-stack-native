import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import Workout from '../../../screens/Workout/Workout';
import { Colors } from '../../../styles/core';
import {
  RootTabParamList,
  WorkoutStackParamList,
} from '../../../types/Navigator/RootNavigator';
import CreateWorkout from '../../Workout/CreateWorkout';
import EditWorkout from '../../Workout/EditWorkout';
import FormSheetHeader from '../Headers/FormSheetHeader';
import EditWorkoutHeader from '../Headers/Workout/EditWorkoutHeader';
import WorkoutHeader from '../Headers/WorkoutHeader';

const Stack = createNativeStackNavigator<WorkoutStackParamList>();

const tabHiddenRoutes = ['EditWorkout'];

const WorkoutNavigator = ({
  navigation,
  route,
}: BottomTabScreenProps<RootTabParamList, 'Workouts'>) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName) {
      if (tabHiddenRoutes.includes(routeName)) {
        console.log('Includes the name ', routeName);
        navigation.setOptions({ tabBarStyle: { display: 'none' } });
      } else {
        console.log('Does not include the name ', routeName);
        navigation.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    }
  }, [route, navigation]);

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
          gestureDirection: 'vertical',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="EditWorkout"
        component={EditWorkout}
        options={({ route }) => ({
          headerTitle: route.params.workoutName,
          animation: 'slide_from_bottom',
          // presentation: 'fullScreenModal',

          header: FormSheetHeader,
          // headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          gestureDirection: 'vertical',
          gestureEnabled: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default WorkoutNavigator;
