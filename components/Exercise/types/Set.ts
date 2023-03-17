export interface Set {
  type: string;
  reps: number;
  weight: number;
  unit: 'lb' | 'kg' | 'stones';
  time?: number;
  startAt: Date;
  enteredAt: Date;
  restTime?: number;
}
