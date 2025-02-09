import { useUuid } from '@/composition/useUuid';

import type { Exercise } from '@/types';

const exercises = ref<Exercise[]>([
  {
    name: 'Жим лежа (штанга)',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
  {
    name: 'Жим лежа (гантели)',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
  {
    name: 'Жим в наклоне 45 (штанга)',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
  {
    name: 'Жим в наклоне 45 (гантели)',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
  {
    name: 'Бабочка (сведения)',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
  {
    name: 'Бицепс с французским грифом',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
  {
    name: 'Гантели на бицепс',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
  {
    name: 'Бицепс в тренажере',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
  {
    name: 'Трицепс в тренажере',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
  {
    name: 'Трицепс в кроссовере с косичками',
    description: '-',
    exerciseId: useUuid('exercise'),
  },
]);

export function useExercisesStore() {
  return reactive({
    exercises,
  });
}
