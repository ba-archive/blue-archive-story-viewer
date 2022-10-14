import { createApp } from "vue";
import { routerConvert } from "./route/routes.js";
import App from "./App.vue";
import "./style.scss";

createApp(App).use(routerConvert).mount("#app");
