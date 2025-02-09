<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';

const menuItems: MenuItem[] = [
  {
    label: 'Упражнения',
    route: { name: 'exercises' },
  },
  {
    label: 'Тренировки',
    route: { name: 'workouts' },
  },
  {
    label: 'Выполненные тренировки',
    route: { name: 'completed-workouts' },
  },
];
</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <Menubar :model="menuItems">
      <template #item="{ item, props }">
        <RouterLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom>
          <a
            v-ripple
            :href="href"
            v-bind="props.action"
            @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>
    </Menubar>

    <RouterView>
      <template #default="{ Component }">
        <template v-if="Component">
          <component :is="Component" />
        </template>

        <div
          v-else
          class="flex justify-center items-center h-full">
          <p>Выберите страницу</p>
        </div>
      </template>
    </RouterView>
  </div>
</template>
