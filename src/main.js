import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { routerConvert } from "./route/routes.js";
import App from "./App.vue";
import "./style.scss";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia).use(routerConvert).mount("#app");
