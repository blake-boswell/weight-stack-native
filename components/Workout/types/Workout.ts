import { ExerciseEntry } from '../../Exercise/types';

export interface Workout {
  name: string;
  exercises: ExerciseEntry[];
  notes: string;
  startTime: Date;
  createdAt: Date;
}
