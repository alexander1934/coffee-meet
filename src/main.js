import { createApp } from "vue";
import "./style.css";
import store from "./store";
import App from "./App.vue";
import router from "./router.js";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-amber/theme.css";

createApp(App).use(router).use(store).use(PrimeVue).mount("#app");
