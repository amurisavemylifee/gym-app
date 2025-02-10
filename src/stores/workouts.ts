import { useUuid } from '@/composition/useUuid';

import type { CreateWorkout, Workout, WorkoutId } from '@/types';

const LOCAL_STORAGE_KEY = 'workouts';

const workouts = ref<Workout[]>([]);

export function useWorkoutsStore() {
  onBeforeMount(() => {
    workouts.value = localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!) : [];
  });

  watch(
    workouts,
    () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...workouts.value]));
    },
    { deep: true }
  );

  const addWorkout = (workout: CreateWorkout) => {
    workouts.value.push({ workoutId: useUuid('workout'), ...workout });
  };

  const removeWorkout = (workoutId: WorkoutId) => {
    workouts.value = workouts.value.filter((item) => item.workoutId !== workoutId);
  };

  const updateWorkout = (workoutId: WorkoutId, workout: CreateWorkout) => {
    const index = workouts.value.findIndex((item) => item.workoutId === workoutId);

    if (index !== -1) {
      workouts.value[index] = { workoutId, ...workout };
    }
  };

  const getWorkoutById = (workoutId: WorkoutId) => {
    return workouts.value.find((item) => item.workoutId === workoutId);
  };

  return reactive({
    workouts,
    addWorkout,
    removeWorkout,
    updateWorkout,
    getWorkoutById,
  });
}
