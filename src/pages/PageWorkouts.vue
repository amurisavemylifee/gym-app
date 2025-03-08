<script setup lang="ts">
import type { CreateWorkout, Workout } from '@/types';

import CreateWorkoutForm from '@/components/CreateWorkoutForm.vue';

const workoutsStore = useWorkoutsStore();
const exercisesStore = useExercisesStore();

const isCreateDialogVisible = ref(false);
const selectedWorkout = ref<Workout | null>(null);

function onConfirm(data: CreateWorkout) {
  if (selectedWorkout.value) {
    workoutsStore.updateWorkout(selectedWorkout.value.workoutId, data);
  } else {
    workoutsStore.addWorkout(data);
  }

  isCreateDialogVisible.value = false;
  selectedWorkout.value = null;
}

function editWorkout(workout: Workout) {
  selectedWorkout.value = JSON.parse(JSON.stringify(workout));
  isCreateDialogVisible.value = true;
}

function openEditDialog() {
  selectedWorkout.value = null;
  isCreateDialogVisible.value = true;
}
</script>

<template>
  <div class="px-8 py-6 flex flex-col gap-6 w-full h-full">
    <template v-if="!workoutsStore.workouts.length || !exercisesStore.exercises.length">
      <div class="h-full flex flex-col gap-4 items-center justify-center">
        <template v-if="!exercisesStore.exercises.length">
          <span class="text-3xl">Сначала добавьте упражнения</span>

          <Button @click="$router.push({ name: 'exercises' })">Перейти</Button>
        </template>

        <template v-else>
          <span class="text-3xl">Тренировки не найдены</span>

          <Button @click="openEditDialog">Добавить</Button>
        </template>
      </div>
    </template>

    <template v-else-if="workoutsStore.workouts.length">
      <div class="flex justify-start items-center gap-4 px-4">
        <span class="text-2xl">Мои тренировки</span>

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
        :value="workoutsStore.workouts">
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

        <Column
          frozen
          alignFrozen="right"
          :style="{ width: '88px' }">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                severity="secondary"
                icon="pi pi-pencil"
                @click="editWorkout(data)" />

              <Button
                severity="danger"
                icon="pi pi-trash"
                @click="workoutsStore.removeWorkout(data.workoutId)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
  </div>

  <Dialog
    v-model:visible="isCreateDialogVisible"
    class="w-[600px]"
    modal
    :closable="false"
    :draggable="false">
    <CreateWorkoutForm
      :workout="selectedWorkout"
      @confirm="onConfirm"
      @cancel="isCreateDialogVisible = false" />
  </Dialog>
</template>
