<script setup lang="ts">
const exercisesStore = useExercisesStore();
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
      </div>
    </template>
  </div>
</template>
