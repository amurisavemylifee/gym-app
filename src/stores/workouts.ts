import { useUuid } from '@/composition/useUuid';

import type { CreateWorkout, GetWorkout, WorkoutId } from '@/types';

const workouts = ref<GetWorkout[]>([]);

export function useWorkoutsStore() {
  onMounted(() => {
    workouts.value = localStorage.getItem('workouts') ? JSON.parse(localStorage.getItem('workouts')!) : [];
  });

  const addWorkout = (workout: CreateWorkout) => {
    workouts.value.push({ workoutId: useUuid('workout'), ...workout });
    localStorage.setItem('workouts', JSON.stringify(workouts.value));
  };

  const removeWorkout = (workoutId: WorkoutId) => {
    workouts.value = workouts.value.filter((item) => item.workoutId !== workoutId);
    localStorage.setItem('workouts', JSON.stringify(workouts.value));
  };

  const updateWorkout = (workoutId: WorkoutId, workout: CreateWorkout) => {
    const index = workouts.value.findIndex((item) => item.workoutId === workoutId);

    if (index !== -1) {
      workouts.value[index] = { workoutId, ...workout };
      localStorage.setItem('workouts', JSON.stringify(workouts.value));
    }
  };

  const getById = (workoutId: WorkoutId) => {
    return workouts.value.find((item) => item.workoutId === workoutId);
  };

  return reactive({
    workouts,
    addWorkout,
    removeWorkout,
    updateWorkout,
    getById,
  });
}
