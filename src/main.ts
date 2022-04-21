import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import App from './App.vue';
import router from './router';
import './index.css';

createApp(App);

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.mount('#app');
