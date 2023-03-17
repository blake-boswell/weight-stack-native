import { ExerciseEntry } from '../Exercise/types';

export default class Workout {
  name: string;
  exercises: ExerciseEntry[];
  notes: string;
  startTime: Date | null;
  createdAt: Date;

  constructor(name: string) {
    this.name = name;
    this.exercises = [];
    this.notes = '';
    this.startTime = null;
    this.createdAt = new Date();
  }
}
