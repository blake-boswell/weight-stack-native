import React from 'react';
import { Text, View } from 'react-native';
import useWorkoutStore from '../../stores/workout/WorkoutStore';

const ActiveWorkout = () => {
  const activeWorkout = useWorkoutStore((state) => state.activeWorkout);

  if (!activeWorkout) {
    return null;
  }

  return (
    <View>
      <Text>{activeWorkout.name}</Text>
      <Text>{activeWorkout.startTime?.toDateString()}</Text>
      <Text>{activeWorkout.notes}</Text>
      <View>
        {activeWorkout.exercises.map((exercise) => (
          <>
            <Text>{exercise.exercise.name}</Text>
            <Text>{exercise.exercise.createdAt.toDateString()}</Text>
            <Text>{exercise.exercise.targetMuscles.map((muscle) => muscle.name).join(', ')}</Text>
            <Text>{exercise.exercise.howTo}</Text>
          </>
        ))}
      </View>
    </View>
  )
}

export default ActiveWorkout;