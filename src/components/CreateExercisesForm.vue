<script lang="ts" setup>
import type { CreateExercise, Exercise } from '@/types';

const $props = defineProps<{
  exercise: Exercise | null;
}>();

const $emits = defineEmits<{
  confirm: [data: CreateExercise];
  cancel: [];
}>();

const form = ref<CreateExercise>({
  name: $props.exercise?.name || '',
  description: $props.exercise?.description || '',
});

function onSave() {
  $emits('confirm', form.value);
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
