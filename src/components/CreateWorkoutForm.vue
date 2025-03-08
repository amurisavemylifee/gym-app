<script lang="ts" setup>
import type { CreateWorkout, Workout } from '@/types';
import type { DataTableRowEditSaveEvent } from 'primevue';

const exercisesStore = useExercisesStore();

const $props = defineProps<{
  workout: Workout | null;
}>();

const $emits = defineEmits<{
  confirm: [data: CreateWorkout];
  cancel: [];
}>();

const form = ref<CreateWorkout>({
  name: '',
  description: '',
  exercises: [
    {
      exerciseId: '',
      reps: [0],
      sets: 1,
      weights: [0],
    },
  ],
});

function saveForm() {
  $emits('confirm', form.value);
}

function closeDialog() {
  $emits('cancel');
}

const editingRows = ref([]);

function onEditConfirm(event: DataTableRowEditSaveEvent) {
  form.value.exercises[event.index] = event.newData;
}

const dialogTitle = computed(() => {
  if ($props.workout) {
    return 'Редактировать тренировку';
  } else {
    return 'Добавить тренировку';
  }
});

onBeforeMount(() => {
  if ($props.workout) {
    form.value = $props.workout;
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

    <div class="flex flex-col gap-6">
      <div class="text-xl text-bold">Основная информация</div>

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

      <div class="flex items-center gap-4">
        <div class="text-xl text-bold">Упражнения</div>

        <Button
          icon="pi pi-plus"
          severity="contrast"
          variant="text"
          rounded
          aria-label="Cancel"
          size="small" />
      </div>

      <DataTable
        :value="form.exercises"
        editMode="row"
        scrollable
        v-model:editingRows="editingRows"
        @row-edit-save="onEditConfirm"
        responsiveLayout="scroll">
        <Column
          field="exerciseId"
          header="Упражнение">
          <template #editor="{ data, field }">
            <Dropdown
              v-model="data[field]"
              :options="exercisesStore.exercises"
              optionLabel="name"
              optionValue="exerciseId"
              placeholder="Выберите упражнение" />
          </template>

          <template #body="{ data }">
            {{ exercisesStore.getExerciseById(data.exerciseId)?.name }}
          </template>
        </Column>

        <Column
          field="sets"
          header="Количество подходов">
          <template #editor="{ data, field }">
            <InputNumber
              v-model="data[field]"
              mode="decimal"
              showButtons
              :min="1"
              :max="9"
              fluid />
          </template>
        </Column>

        <Column
          field="reps"
          header="Повторения"
          class="w-45">
          <template #editor="{ data, field }">
            <div class="w-34 grid grid-cols-3 gap-x-2">
              <InputText
                v-for="(_, idx) in data.sets"
                v-model="data[field][idx]"
                class="w-10" />
            </div>
          </template>
        </Column>

        <Column
          field="weights"
          header="Веса"
          class="w-45">
          <template #editor="{ data, field }">
            <div class="w-34 grid grid-cols-3 gap-x-2">
              <InputText
                v-for="(_, idx) in data.sets"
                v-model="data[field][idx]"
                class="w-10" />
            </div>
          </template>
        </Column>

        <Column
          :rowEditor="true"
          headerStyle="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center" />
      </DataTable>
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
