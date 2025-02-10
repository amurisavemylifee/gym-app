import type { UUID } from './utils';

export type ExerciseId = UUID;

export interface CreateExercise {
  name: string;
  description: string;
}

export interface Exercise extends CreateExercise {
  exerciseId: ExerciseId;
}

export interface ExerciseInWorkout {
  exerciseId: ExerciseId;
  reps: number[];
  sets: number;
  weights: number[];
}

export interface CompletedExercise {
  exerciseId: ExerciseId;
  reps: number[];
  sets: number;
  weights: number[];
  difficulty?: number[];
}
