<script setup lang="ts">
const completedWorkoutsStore = useCompletedWorkoutsStore();

const isCreateDialogVisible = ref(false);

function onConfirm() {
  // workoutsStore.addWorkout(data);

  isCreateDialogVisible.value = false;
}
</script>

<template>
  <div class="pt-10 flex flex-col gap-5 w-full h-full">
    {{ completedWorkoutsStore.serializedCompletedWorkouts }}
    <template v-if="completedWorkoutsStore.completedWorkouts.length">
      <div class="flex justify-end">
        <Button
          severity="success"
          @click="isCreateDialogVisible = true">
          Добавить
        </Button>
      </div>

      <!-- <DataTable :value="completedWorkoutsStore.serializedCompletedWorkouts">
        <Column
          field="name"
          header="Название тренировки" />

        <Column
          field="description"
          header="Дата" />
      </DataTable> -->
    </template>

    <template v-else>
      <div class="text-3xl h-full flex flex-col gap-4 items-center justify-center">
        <span>Тренировки не найдены</span>
        <Button
          severity="success"
          @click="isCreateDialogVisible = true">
          Добавить
        </Button>
      </div>
    </template>
  </div>

  <Dialog
    v-model:visible="isCreateDialogVisible"
    modal>
  </Dialog>
</template>
