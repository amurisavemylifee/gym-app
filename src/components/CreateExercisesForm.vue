<script lang="ts" setup>
import type { CreateWorkout, Exercise } from '@/types';

const props = defineProps<{
  exercise?: Exercise
}>()

const $emits = defineEmits<{
  confirm: [data: CreateWorkout];
  cancel: []
}>();

const form = ref<CreateWorkout>({
  name: '',
  description: '',
  exercises: [
    {
      exerciseId: '',
      reps: [0],
      sets: 1,
      weights: [0],
    },
  ],
});

watch(
  () => props.exercise,
  (newExercise) => {
    if (newExercise) {
      form.value = {
        name: newExercise.name,
        description: newExercise.description,
        exercises: newExercise.exercises,
      };
    } else {
      form.value = {
        name: '',
        description: '',
        exercises: [
          {
            exerciseId: '',
            reps: [0],
            sets: 1,
            weights: [0],
          },
        ],
      };
    }
  },
  { immediate: true }
);

function onSave(){
$emits('confirm', form.value)
}


</script>

<template>
  <div class="w-full flex flex-col gap-4 justify-center">
    <InputText
      v-model="form.name"
      type="text"
      placeholder="Название" />

    <InputText
      v-model="form.description"
      type="text"
      placeholder="Описание" />
    <Button
      class="mt-10"
      severity="success"
      @click="onSave">
      Сохранить
    </Button>
  </div>
</template>
