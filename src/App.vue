<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DesktopMenu from './components/DesktopMenu.vue';
import HomeWelcomeScreen from './components/HomeWelcomeScreen.vue';
import MobileMenu from './components/MobileMenu.vue';

const route = useRoute();

const isMainPage = computed(() => route.path === '/');

const getMainPageClass = computed(() =>
  route.path === '/' ? 'main-page' : ''
);
</script>

<template>
  <desktop-menu class="desktop-menu" />
  <mobile-menu class="mobile-menu" />
  <div id="main-view" class="rounded-large" :class="getMainPageClass">
    <home-welcome-screen :isMainPage="isMainPage" v-if="isMainPage" />
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.mobile-menu {
  display: none;
}

#main-view {
  display: flex;
  grid-area: main;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--color-main-background);
  overflow-y: scroll;

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
  .desktop-menu {
    display: none;
  }

  .mobile-menu {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100vw;
  }

  #main-view {
    border-radius: 0;
    -webkit-border-radius: 0;
    padding: 3rem 1rem 0 1rem;
    width: 100vw;
    overflow: auto;
  }
}
</style>
