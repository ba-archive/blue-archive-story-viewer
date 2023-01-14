<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRoute } from 'vue-router';
import HomeWelcomeScreen from './components/HomeWelcomeScreen.vue';
import DesktopMenu from './components/menu/DesktopMenu.vue';
import MobileMenu from './components/menu/MobileMenu.vue';

const route = useRoute();
const showMobileMenu = ref(false);

const isMainPage = computed(() => route.path === '/');

const getMainPageClass = computed(() =>
  route.path === '/' ? 'main-page' : ''
);

const isMac = () => {
  const userAgent = navigator.userAgent;
  return userAgent.indexOf('Mac OS X') > -1;
};

if (!isMac()) {
  const htmlElement = document.querySelector('html') as HTMLHtmlElement;
  htmlElement.dataset.scrollbar = 'customize';
}

let ticking = false;
function handleWindowSizeChange() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    const htmlElement = document.querySelector('html') as HTMLHtmlElement;
    showMobileMenu.value = htmlElement.clientWidth <= 768;
    ticking = false;
  });
}

onBeforeMount(() => {
  const htmlElement = document.querySelector('html') as HTMLHtmlElement;
  showMobileMenu.value = htmlElement.clientWidth <= 768;
  window.addEventListener('resize', handleWindowSizeChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowSizeChange);
});
</script>

<template>
  <mobile-menu v-if="showMobileMenu" />
  <desktop-menu v-else />
  <div id="main-view" class="rounded-large" :class="getMainPageClass">
    <home-welcome-screen :isMainPage="isMainPage" v-if="isMainPage" />
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
#main-view {
  display: flex;
  grid-area: main;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--color-main-background);
  overflow-y: auto;

  &.main-page {
    background-color: transparent;
  }
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: opacity 0.375s;
  width: 100vw;
  height: var(--main-height, 93vh);
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  #main-view {
    border-radius: 0;
    -webkit-border-radius: 0;
    padding: 3.5rem 1rem 1rem 1rem;
    width: 100vw;
    height: calc(100vh - 3.5rem);
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
