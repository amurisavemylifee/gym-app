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

function saveForm() {
  $emits('confirm', form.value);
}

function closeDialog() {
  $emits('cancel');
}

const dialogTitle = computed(() => {
  if ($props.exercise) {
    return 'Редактировать упражнение';
  } else {
    return 'Добавить упражнение';
  }
});
</script>

<template>
  <div class="w-full flex flex-col gap-8 justify-center">
    <div class="flex justify-between">
      <span class="text-2xl">{{ dialogTitle }}</span>

      <Button
        icon="pi pi-times"
        severity="contrast"
        variant="text"
        rounded
        aria-label="Cancel"
        @click="closeDialog" />
    </div>

    <div class="flex flex-col gap-4">
      <InputText
        v-model="form.name"
        type="text"
        placeholder="Название" />

      <InputText
        v-model="form.description"
        type="text"
        placeholder="Описание" />
    </div>

    <div class="flex gap-4 justify-end">
      <Button
        severity="success"
        @click="saveForm">
        Сохранить
      </Button>

      <Button
        severity="danger"
        @click="closeDialog">
        Отменить
      </Button>
    </div>
  </div>
</template>
