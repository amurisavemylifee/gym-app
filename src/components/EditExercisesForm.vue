<!-- <script lang="ts" setup>
import type { Exercise } from '@/types';
import { ref } from 'vue';

const props = defineProps<{
  exercise: Exercise;
}>();

const $emits = defineEmits<{
  confirm: [data: Exercise];
  cancel: [];
}>();

const form = ref<Exercise>({
  exerciseId: props.exercise.exerciseId,
  name: props.exercise.name,
  description: props.exercise.description,
});

function onSave() {
  $emits('confirm', form.value);
}

function onCancel() {
  $emits('cancel');
}
</script>

<template>
  <div class="w-full flex flex-col gap-4 justify-center">
    <InputText v-model="form.name" type="text" placeholder="Название" />
    <InputText v-model="form.description" type="text" placeholder="Описание" />
    <div class="flex justify-between mt-10">
      <Button severity="success" @click="onSave">Сохранить</Button>
      <Button severity="danger" @click="onCancel">Отмена</Button>
    </div>
  </div>
</template> -->