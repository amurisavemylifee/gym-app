<script lang="ts" setup>
import type { CreateWorkout } from '@/types';
// import type { DataTableRowEditSaveEvent } from 'primevue';

const $emits = defineEmits<{
  confirm: [data: CreateWorkout];
}>();



// function onEditConfirm(event: DataTableRowEditSaveEvent) {
//   form.value.exercises[event.index] = event.newData;
// }

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
      @click="$emits('confirm', form)">
      Сохранить
    </Button>
  </div>
</template>
