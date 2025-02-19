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
  selectedExercise.value = exercise;
  isCreateDialogVisible.value = true;
}

function onCreate() {
  selectedExercise.value = null;
  isCreateDialogVisible.value = true;
}
</script>

<template>
  <div class="pt-10 flex flex-col gap-5 w-full h-full">
    <template v-if="exercisesStore.exercises.length">
      <DataTable :value="exercisesStore.exercises">
        <div class="flex justify-end">
          <Button
            severity="success"
            @click="onCreate"
            >Добавить</Button
          >
        </div>
        <Column
          field="name"
          header="Название" />
        <Column
          field="description"
          header="Описание" />
        <Column>
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                severity="warn"
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
      <div class="text-3xl h-full flex flex-col gap-4 items-center justify-center">
        <span>Упражнения не найдены</span>
        <Button
          severity="success"
          @click="onCreate"
          >Добавить</Button
        >
      </div>
    </template>
    <Dialog
      v-model:visible="isCreateDialogVisible"
      modal>
      <CreateExercisesForm
        :exercise="selectedExercise"
        @confirm="onConfirm" />
    </Dialog>
  </div>
</template>
