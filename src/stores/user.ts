// stores/userStore.ts
import { ref, onBeforeMount, watch } from 'vue';
import { useUuid } from '@/composition/useUuid';

const LOCAL_STORAGE_KEY = 'userProfile';

const userData = ref({
  height: 0,
  weight: 0,
  age: 0,
  gender: '',
  startDate: '',
});

export function useUserStore() {
  onBeforeMount(() => {
    const storedUserData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUserData) {
      userData.value = JSON.parse(storedUserData);
    }
  });

  watch(
    userData,
    () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData.value));
    },
    { deep: true }
  );

  const getUserData = () => {
    return userData.value;
  };

  const updateUserData = (data: any) => {
    userData.value = { ...userData.value, ...data };
  };

  return {
    getUserData,
    updateUserData,
  };
}