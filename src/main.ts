import './assets/scss/app.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vClickOutside from 'click-outside-vue3';

import App from './App.vue';
import router from './router';
import { createMetaManager } from 'vue-meta';
import '@egjs/vue3-flicking/dist/flicking.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vClickOutside);
app.use(createMetaManager());

app.mount('#app');
