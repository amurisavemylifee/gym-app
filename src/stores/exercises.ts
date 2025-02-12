import { useUuid } from '@/composition/useUuid';

import type { CreateExercise, Exercise, ExerciseId } from '@/types';

// const LOCAL_STORAGE_KEY = 'exercises';

const exercises = ref<Exercise[]>([{ exerciseId: useUuid('exercise'), name: 'test', description: 'test' }]);

export function useExercisesStore() {
  // onBeforeMount(() => {
  //   exercises.value = localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!) : [];
  // });

  // watch(
  //   exercises,
  //   () => {
  //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...exercises.value]));
  //   },
  //   { deep: true }
  // );

  const addExercise = (exercise: CreateExercise) => {
    exercises.value.push({ exerciseId: useUuid('exercise'), ...exercise });
  };

  const removeExercise = (exerciseId: ExerciseId) => {
    exercises.value = exercises.value.filter((item) => item.exerciseId !== exerciseId);
  };

  const updateExercise = (exerciseId: ExerciseId, exercise: Exercise) => {
    const index = exercises.value.findIndex((item) => item.exerciseId === exerciseId);

    if (index !== -1) {
      exercises.value[index] = { ...exercise, exerciseId };
    }
  };

  const getExerciseById = (exerciseId: ExerciseId) => {
    return exercises.value.find((item) => item.exerciseId === exerciseId);
  };

  return reactive({
    exercises,
    addExercise,
    removeExercise,
    updateExercise,
    getExerciseById,
  });
}
