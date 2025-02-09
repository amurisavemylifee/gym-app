<script lang="ts" setup>
import type { CreateWorkout } from '@/types';

const $emits = defineEmits<{
  confirm: [data: CreateWorkout];
}>();

const exercisesStore = useExercisesStore();

const form = ref<CreateWorkout>({
  name: '',
  description: '',
  exercises: [
    {
      exerciseId: '',
      reps: '',
      sets: 0,
      weights: '',
    },
  ],
});
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

    <div class="text-2xl text-bold">Упражнения</div>

    <div class="flex flex-col gap-4">
      <div
        v-for="item in form.exercises"
        class="flex gap-2">
        <Select
          v-model="item.exerciseId"
          :options="exercisesStore.exercises"
          optionLabel="name"
          placeholder="Выберите упражнение" />

        <InputNumber
          v-model="item.sets"
          placeholder="Кол во подходов" />

        <InputText
          v-model="item.weights"
          placeholder="Веса на подходы" />

        <InputText
          v-model="item.reps"
          placeholder="Кол во повторений на подход" />

        <Button
          severity="danger"
          icon="pi pi-trash"
          :disabled="form.exercises.length === 1"
          @click="form.exercises.splice(form.exercises.indexOf(item), 1)" />
      </div>

      <Button
        severity="success"
        icon="pi pi-plus"
        label="Добавить упражнение"
        @click="form.exercises.push({ exerciseId: '', reps: '', sets: 0, weights: '' })" />
    </div>

    <Button
      class="mt-10"
      severity="success"
      @click="$emits('confirm', form)">
      Сохранить
    </Button>
  </div>
</template>
