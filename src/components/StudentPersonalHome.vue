<script setup>
import { mainStore } from "../store/store.js";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const store = mainStore();

const lang = store.getLang;
</script>

<template>
  <div class="fill-width flex-vertical rounded">
    <div class="student-home-nav-bar">
      <language-switcher />
      <router-link :to="{ name: 'momotalk' }" class="button" role="button"
        >momotalk</router-link
      >
      <router-link :to="{ name: 'studentStory' }" class="button" role="button"
        >Story</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
