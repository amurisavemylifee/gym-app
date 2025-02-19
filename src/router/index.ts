import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/exercises',
      name: 'exercises',
      component: () => import('@/pages/PageExercises.vue'),
    },
    {
      path: '/workouts',
      name: 'workouts',
      component: () => import('@/pages/PageWorkouts.vue'),
    },
    {
      path: '/completed-workouts',
      name: 'completed-workouts',
      component: () => import('@/pages/PageCompletedWorkouts.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/pages/PageUser.vue'),
    },
  ],
});
