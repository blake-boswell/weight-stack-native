export type WorkoutStackParamList = {
  Main: undefined;
  CreateWorkout: undefined;
  EditWorkout: {
    workoutName: string;
  };
};

export type RoutineStackParamList = {
  Main: undefined;
  CreateRoutine: undefined;
  EditRoutine: {
    name: string;
  };
};

export type RootTabParamList = {
  Routines: undefined;
  Workouts: undefined;
  Stats: undefined;
  Program: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  ActiveWorkout: undefined;
};
