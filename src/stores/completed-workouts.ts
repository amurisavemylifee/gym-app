import { useUuid } from '@/composition/useUuid';

import type { CreateCompletedWorkout, CompletedWorkoutId, GetCompletedWorkout } from '@/types';

const completedWorkouts = ref<GetCompletedWorkout[]>([]);

export function useCompletedWorkoutsStore() {
  const workoutsStore = useWorkoutsStore();

  onMounted(() => {
    completedWorkouts.value = localStorage.getItem('completedWorkouts')
      ? JSON.parse(localStorage.getItem('completedWorkouts')!)
      : [{ date: new Date(), completedWorkoutId: useUuid('completedWorkout'), workoutId: 'uuid-workout-1739101316386', exercises: [] }];
  });

  const addCompletedWorkout = (completedWorkout: CreateCompletedWorkout) => {
    completedWorkouts.value.push({ completedWorkoutId: useUuid('completedWorkout'), ...completedWorkout });
    localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts.value));
  };

  const removeCompletedWorkout = (completedWorkoutId: CompletedWorkoutId) => {
    completedWorkouts.value = completedWorkouts.value.filter((item) => item.completedWorkoutId !== completedWorkoutId);
    localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts.value));
  };

  const serializedCompletedWorkouts = computed(() => {
    return completedWorkouts.value.map((item) => {
      return {
        completedWorkoutId: item.completedWorkoutId,
        workout: workoutsStore.getById(item.workoutId),
        date: item.date,
        exercises: item.exercises,
      };
    });
  });

  return reactive({
    completedWorkouts,
    addCompletedWorkout,
    removeCompletedWorkout,
    serializedCompletedWorkouts,
  });
}
