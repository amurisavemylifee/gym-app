import type { CompletedExercise, ExerciseInWorkout } from './exercise';
import type { UUID } from './utils';

export type WorkoutId = UUID;
export type CompletedWorkoutId = UUID;

export type CreateWorkout = {
  name: string;
  description: string;
  exercises: ExerciseInWorkout[];
};

export interface Workout extends CreateWorkout {
  workoutId: WorkoutId;
}

export interface CreateCompletedWorkout {
  workoutId: WorkoutId;
  date: Date;
  exercises: CompletedExercise[];
}

export interface CompletedWorkout extends CreateCompletedWorkout {
  completedWorkoutId: CompletedWorkoutId;
}

export type CompletedWorkoutDetail = CompletedWorkout & {
  workout: Workout;
};
