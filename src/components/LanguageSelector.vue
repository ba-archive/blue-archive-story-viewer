<script setup>
import { ref } from "vue";
import { mainStore } from "../store/store.js";

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

const store = mainStore();
const selectedLang = ref(store.getLang);

function handleLangChange(event) {
  store.setLang(event.target.value);
}
</script>

<template>
  <div class="selection">
    <select
      class="language-switcher"
      v-model="selectedLang"
      @change="handleLangChange($event)"
    >
      <option
        v-for="language in languages"
        :key="language.code"
        :value="language.code"
      >
        {{ language.name }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
select {
  appearance: none;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
  padding: 0 0.5rem;
  color: var(--color-text-main);
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  text-align: center;
}

.selection {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: var(--style-switch-track-shadow);
  border-radius: 0.5rem;
  background-color: var(--color-switch-track);
  width: fit-content;
  user-select: none;

  //&::after {
  //  display: inline-block;
  //  margin-right: 0.5rem;
  //  border-top: 0.5rem solid var(--color-text-dark);
  //  border-right: 0.5rem solid transparent;
  //  border-left: 0.5rem solid transparent;
  //  width: 0;
  //  height: 0;
  //  content: "";
  //  cursor: default;
  //}
}
</style>
