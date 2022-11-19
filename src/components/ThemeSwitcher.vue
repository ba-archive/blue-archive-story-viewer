<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '../store/settings';

const settingsStore = useSettingsStore();
const currentTheme = computed(() => settingsStore.getTheme);

function switchTheme(theme: string) {
  const htmlElement = document.querySelector('html') as HTMLHtmlElement;
  switch (theme) {
    case 'light':
      htmlElement.dataset.theme = 'light';
      break;
    case 'dark':
      htmlElement.dataset.theme = 'dark';
      break;
  }
}
if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  settingsStore.setTheme('dark');
}

switchTheme(currentTheme.value);

function toggleTheme() {
  const toggledTheme = 'light' === currentTheme.value ? 'dark' : 'light';
  switchTheme(toggledTheme);
  settingsStore.setTheme(toggledTheme);
}
</script>

<template>
  <div id="theme-switcher">
    <img id="dark-mode-icon" src="/src/assets/dark-mode.svg" alt="Dark Mode" />
    <input
      class="switch rounded-medium"
      :checked="'light' === currentTheme"
      type="checkbox"
      @change="toggleTheme"
    />
    <img
      id="light-mode-icon"
      src="/src/assets/light-mode.svg"
      alt="Light Mode"
    />
  </div>
</template>

<style scoped lang="scss">
#theme-switcher {
  grid-gap: 0.5rem;
  display: grid;
  grid-template-columns: min-content auto min-content;
  grid-template-areas: 'dark-mode-icon switch light-mode-icon';
  justify-content: space-evenly;
  align-items: center;
  width: fit-content;

  #dark-mode-icon {
    grid-area: dark-mode-icon;
    width: 1.5rem;
    height: 1.5rem;
  }

  #light-mode-icon {
    grid-area: light-mode-icon;
    width: 1.5rem;
    height: 1.5rem;
  }
}

input.switch {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'track';
  grid-area: switch;
  align-items: center;
  justify-items: start;
  appearance: none;
  transition: all 0.375s ease-in-out;
  cursor: pointer;
  box-sizing: content-box;
  outline: none !important;
  box-shadow: var(--style-switch-track-shadow);
  border: none !important;
  background-color: var(--color-switch-track);
  min-width: 3rem;
  max-width: 3rem;

  /* button-thumb */
  &::after {
    grid-area: track;
    justify-self: start;
    box-shadow: var(--style-switch-shadow);
    border-radius: 50%;
    background: var(--style-switch-texture);
    width: 1.25rem;
    height: 1.25rem;
    content: '';
  }

  &:checked::after {
    justify-self: end;
  }
}
</style>
