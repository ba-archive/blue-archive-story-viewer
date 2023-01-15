// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { registerSW } from 'virtual:pwa-register';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Toastify from 'toastify-js';
import { createApp } from 'vue';
import { routerConvert } from './route/routes';
import App from './App.vue';
import './style.scss';

const updateSW = registerSW({
  onNeedRefresh() {
    Toastify({
      text: `<h4 style='display:inline;margin-bottom:1rem'>后台资源已更新，请刷新页面以使用新版本</h4>
<a class='do-sw-update'>刷新</a>`,
      escapeMarkup: false,
      gravity: 'bottom',
      onClick() {
        // noinspection JSIgnoredPromiseFromCall
        updateSW(true);
      },
    }).showToast();
  },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia).use(routerConvert).mount('#app');
