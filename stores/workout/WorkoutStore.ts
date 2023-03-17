import { create } from 'zustand';
import Workout from '../../components/Workout';

interface WorkoutState {
  activeWorkout: Workout | null;
  setActiveWorkout: (workout: Workout) => void;
  clearActiveWorkout: () => void;
}

const useWorkoutStore = create<WorkoutState>(set => ({
  activeWorkout: null,
  setActiveWorkout: workout => set(state => ({ ...state, workout })),
  clearActiveWorkout: () => set(state => ({ ...state, workout: null })),
}));

export default useWorkoutStore;
