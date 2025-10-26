import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import "@/tailwind.css";

createApp(App)
  .use(createPinia())
  .use(FloatingVue)
  .use(router)
  .mount('#app');
