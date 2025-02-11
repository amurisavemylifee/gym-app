<script lang="ts" setup>
import type { CreateWorkout } from '@/types';
import type { DataTableRowEditSaveEvent } from 'primevue';

const $emits = defineEmits<{
  confirm: [data: CreateWorkout];
}>();

const exercisesStore = useExercisesStore();

const editingRows = ref([]);

function onEditConfirm(event: DataTableRowEditSaveEvent) {
  form.value.exercises[event.index] = event.newData;
}

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
</script>

<template>
  <div class="w-full flex flex-col gap-4 justify-center">
    <InputText
      v-model="form.name"
      type="text"
      placeholder="Название" />

    <InputText
      v-model="form.description"
      type="text"
      placeholder="Описание" />

    <div class="text-2xl text-bold">Упражнения</div>

    <!-- <div class="flex flex-col gap-4">
      <div
        v-for="item in form.exercises"
        class="flex gap-2">
        <Select
          v-model="item.exerciseId"
          :options="exercisesStore.exercises"
          optionLabel="name"
          placeholder="Выберите упражнение" />

        <InputNumber
          v-model="item.sets"
          placeholder="Кол во подходов" />

        <InputText
          v-model="item.weights"
          placeholder="Веса на подходы" />

        <InputText
          v-model="item.reps"
          placeholder="Кол во повторений на подход" />

        <Button
          severity="danger"
          icon="pi pi-trash"
          :disabled="form.exercises.length === 1"
          @click="form.exercises.splice(form.exercises.indexOf(item), 1)" />
      </div>

      <Button
        severity="success"
        icon="pi pi-plus"
        label="Добавить упражнение"
        @click="form.exercises.push({ exerciseId: '', reps: '', sets: 0, weights: '' })" />
    </div> -->

    <DataTable
      :value="form.exercises"
      editMode="row"
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
        header="Повторения">
        <template #editor="{ data, field, index }">
          <div class="grid grid-cols-3">
            <InputText
              v-for="(_, idx) in data.sets"
              v-model="data[field][idx]"
              class="w-15" />
          </div>
        </template>
      </Column>

      <Column
        field="weights"
        header="Веса">
        <template #editor="{ data, field, index }">
          <div class="grid grid-cols-3">
            <InputText
              v-for="(_, idx) in data.sets"
              v-model="data[field][idx]"
              class="w-15" />
          </div>
        </template>
      </Column>

      <Column
        :rowEditor="true"
        headerStyle="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center" />
    </DataTable>

    <Button
      class="mt-10"
      severity="success"
      @click="$emits('confirm', form)">
      Сохранить
    </Button>
  </div>
</template>
