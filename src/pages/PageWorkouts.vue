<script setup lang="ts">
import CreateWorkoutForm from '@/components/CreateWorkoutForm.vue';
import type { CreateWorkout } from '@/types';
const workoutsStore = useWorkoutsStore();

const isCreateDialogVisible = ref(false);

function onConfirm(data: CreateWorkout) {
  workoutsStore.addWorkout(data);

  isCreateDialogVisible.value = false;
}
</script>

<template>
  <div class="pt-10 flex flex-col gap-5 w-full h-full">
    <template v-if="workoutsStore.workouts.length">
      <div class="flex justify-end">
        <Button
          severity="success"
          @click="isCreateDialogVisible = true">
          Добавить
        </Button>
      </div>

      <DataTable :value="workoutsStore.workouts">
        <Column
          field="name"
          header="Название" />

        <Column
          field="description"
          header="Описание" />

        <Column header="Кол во упражнений">
          <template #body="{ data }">
            {{ data.exercises.length }}
          </template>
        </Column>
      </DataTable>
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
    <CreateWorkoutForm @confirm="onConfirm" />
  </Dialog>
</template>
