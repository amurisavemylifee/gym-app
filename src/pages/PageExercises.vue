<script setup lang="ts">
import type { CreateExercise, Exercise } from '@/types';

import CreateExercisesForm from '@/components/CreateExercisesForm.vue';

const exercisesStore = useExercisesStore();

const isCreateDialogVisible = ref(false);
const selectedExercise = ref<Exercise | null>(null);

function onConfirm(data: CreateExercise) {
  if (selectedExercise.value) {
    exercisesStore.updateExercise(selectedExercise.value.exerciseId, data);
  } else {
    exercisesStore.addExercise(data);
  }

  isCreateDialogVisible.value = false;
  selectedExercise.value = null;
}

function onEdit(exercise: Exercise) {
  selectedExercise.value = JSON.parse(JSON.stringify(exercise));
  isCreateDialogVisible.value = true;
}

function openEditDialog() {
  selectedExercise.value = null;
  isCreateDialogVisible.value = true;
}
</script>

<template>
  <div class="px-8 py-6 flex flex-col gap-6 w-full h-full">
    <template v-if="exercisesStore.exercises.length">
      <div class="flex justify-start items-center gap-4 px-4">
        <span class="text-2xl">Мои упражнения</span>

        <Button
          size="small"
          @click="openEditDialog">
          Добавить
        </Button>
      </div>

      <DataTable
        scrollable
        paginator
        show-gridlines
        :rows="11"
        :value="exercisesStore.exercises">
        <Column
          field="name"
          header="Название" />

        <Column
          field="description"
          header="Описание" />

        <Column
          frozen
          alignFrozen="right"
          :style="{ width: '88px' }">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                severity="secondary"
                icon="pi pi-pencil"
                @click="onEdit(data)" />

              <Button
                severity="danger"
                icon="pi pi-trash"
                @click="exercisesStore.removeExercise(data.exerciseId)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </template>

    <template v-else>
      <div class="h-full flex flex-col gap-4 items-center justify-center">
        <span class="text-3xl">Упражнения не найдены</span>

        <Button @click="openEditDialog">Добавить</Button>
      </div>
    </template>

    <Dialog
      v-model:visible="isCreateDialogVisible"
      class="w-[600px]"
      modal
      :closable="false"
      :draggable="false">
      <CreateExercisesForm
        :exercise="selectedExercise"
        @confirm="onConfirm"
        @cancel="isCreateDialogVisible = false" />
    </Dialog>
  </div>
</template>
