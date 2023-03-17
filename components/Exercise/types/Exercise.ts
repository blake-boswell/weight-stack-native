import { Muscle } from '../../Muscle/types';
import { Set } from './Set';

interface RepRange {
  upper: number;
  lower: number;
}

export interface Exercise {
  id: number;
  name: string;
  targetMuscles: Muscle[];
  howTo: string;
  createdAt: Date;
}

export interface ExerciseEntry {
  exercise: Exercise;
  targetSets?: number;
  targetRepRange?: RepRange;
  targetRepsInReserve?: number;
  sets: Set[];
  notes: string;
}
