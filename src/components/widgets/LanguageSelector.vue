<script setup lang="ts">
import { ref } from 'vue';
import { useSettingsStore } from '../../store/settings';

const languages = ref([
  {
    name: '简体中文',
    code: 'cn',
  },
  {
    name: '繁體中文',
    code: 'tw',
  },
  {
    name: '日本語',
    code: 'jp',
  },
  {
    name: 'English',
    code: 'en',
  },
  {
    name: '한국어',
    code: 'kr',
  },
  {
    name: 'ไทย',
    code: 'th',
  },
]);

const settingsStore = useSettingsStore();
const selectedLang = ref(settingsStore.getLang);

function handleLangChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  settingsStore.setLang(target.value);
}
</script>

<template>
  <div class="selection rounded-small">
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
  -webkit-appearance: none;
  transition: color 0.375s ease-in-out;
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
  transition: all 0.375s ease-in-out;
  box-shadow: var(--style-switch-track-shadow);
  background-color: var(--color-switch-track);
  width: fit-content;
  user-select: none;
}
</style>
