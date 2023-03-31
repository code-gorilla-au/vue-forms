import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import BasicForm from './examples/basic-form.vue';
import DynamicForm from './examples/dynamic-form.vue';
import './style.css';
import App from './App.vue';

const router = createRouter({
  routes: [
    {
      path: '/',
      component: BasicForm,
    },
    {
      path: '/dynamic',
      component: DynamicForm,
    },
  ],
  history: createWebHistory(),
});

createApp(App).use(router).mount('#app');
