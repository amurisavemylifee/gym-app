type UUID = string;

export type WorkoutId = UUID;
export type CompletedWorkoutId = UUID;
export type ExerciseId = UUID;

export interface CreateWorkout {
  name: string;
  description: string;
  exercises: ExerciseInWorkout[];
}

export interface GetWorkout {
  workoutId: WorkoutId;
  name: string;
  description: string;
  exercises: ExerciseInWorkout[];
}

export interface CreateCompletedWorkout {
  workoutId: WorkoutId;
  date: Date;
  exercises: CompletedExercise[];
}

export interface GetCompletedWorkout {
  completedWorkoutId: CompletedWorkoutId;
  workoutId: WorkoutId;
  date: Date;
  exercises: CompletedExercise[];
}

export interface Exercise {
  exerciseId: ExerciseId;
  name: string;
  description: string;
}

export interface ExerciseInWorkout {
  exerciseId: ExerciseId;
  reps: string;
  sets: number;
  weights: string;
}

export interface CompletedExercise {
  exerciseId: ExerciseId;
  reps: string;
  sets: number;
  weights: string;
  difficulty?: string;
}
