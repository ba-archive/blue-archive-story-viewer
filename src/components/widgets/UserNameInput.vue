<template>
  <span
    class="user-name-input"
    contenteditable="true"
    @input="updateUsername"
    @keydown.enter.prevent
  >
    {{ username }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '../../store/settings';

const settingsStore = useSettingsStore();
const username = computed(() => settingsStore.getUsername);

function updateUsername(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.innerText ?? '';
  settingsStore.setUsername(value.slice(0, 10));
}
</script>

<style scoped lang="scss">
.user-name-input {
  max-width: 8rem;
  text-decoration: underline;
  text-underline-offset: 0.1rem;
}
</style>
