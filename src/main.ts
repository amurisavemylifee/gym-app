import { createApp } from 'vue';

import './index.css';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

import App from './App.vue';
import router from './router';

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(router)
  .mount('#app');
