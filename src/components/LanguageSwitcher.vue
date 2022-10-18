<script setup>
import { ref, watch } from "vue";
import { mainStore } from "../store/store.js";

const store = mainStore();
const lang = store.getLang;
const selectedLang = ref(lang);

const languages = ref([
  {
    name: "中文",
    code: "zh",
  },
  {
    name: "日本語",
    code: "jp",
  },
]);

watch(selectedLang, (newVal) => {
  store.setLang(newVal);
});
</script>

<template>
  <select class="language-switcher" v-model="selectedLang">
    <option
      v-for="language in languages"
      :key="language.code"
      :value="language.code"
    >
      {{ language.name }}
    </option>
  </select>
</template>

<style scoped lang="scss"></style>
