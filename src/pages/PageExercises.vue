<script setup lang="ts">
import type { CreateExercise } from '@/types';

import CreateExercisesForm from '@/components/CreateExercisesForm.vue';

const exercisesStore = useExercisesStore();

const isCreateDialogVisible = ref(false);

function onConfirm(data: CreateExercise) {
  exercisesStore.addExercise(data);

  isCreateDialogVisible.value = false;
}


</script>

<template>
  <div class="pt-10 flex flex-col gap-5 w-full h-full">

    
    <template v-if="exercisesStore.exercises.length">
      <DataTable :value="exercisesStore.exercises">
        <Column
          field="name"
          header="Название" />
        <Column
          field="description"
          header="Описание" />
      </DataTable>
    </template>
  
    
    
    <template v-else>
      <div class="text-3xl h-full flex flex-col gap-4 items-center justify-center">
        <span>Упражнения не найдены</span>
        <Button
          severity="success"
          @click="isCreateDialogVisible = true">
          Добавить
        </Button>
      </div>
      
    </template>
    <Dialog  log
    v-model:visible="isCreateDialogVisible"
    modal>
    <CreateExercisesForm @confirm="onConfirm" />
  </Dialog>
  </div>
</template>
