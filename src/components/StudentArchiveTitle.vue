<!--suppress JSIncompatibleTypesComparison -->
<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['clicked']);
const props = defineProps({
  title: { type: Object, required: true },
  index: { type: Number, required: false },
  language: { type: String, required: true },
  isActive: { type: Boolean, required: false },
});

function handleClick() {
  emit('clicked');
}

const selectedLangTitle = computed(() => {
  if ('zh' === props.language) {
    return props.title.TextCn || undefined;
  } else if ('jp' === props.language) {
    return props.title.TextJp || undefined;
  } else {
    return props.title.TextEn || undefined;
  }
});
</script>

<template>
  <div
    class="archive-title rounded-small"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <p class="section-title">
      <span class="ordered-list">{{
        `${parseInt(index?.toString() || '0') + 1}`.padStart(2, '0')
      }}</span>
      <span class="title">{{ selectedLangTitle || '!StoryTitleMissing' }}</span>
    </p>
    <!-- eslint-disable max-len -->
    <svg
      class="navigate-arrow"
      :class="isActive ? 'open' : ''"
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      viewBox="0 0 451.8 451.8"
    >
      <path
        fill="#344A6E"
        d="M225.9 354.7c-8.1 0-16.2-3.1-22.4-9.3L9.3 151.2c-12.4-12.4-12.4-32.4 0-44.8C21.7 94 41.7 94 54 106.4l171.9 171.9 171.9-171.9c12.4-12.4 32.4-12.4 44.7 0 12.4 12.4 12.4 32.4 0 44.8L248.3 345.4c-6.2 6.2-14.3 9.3-22.4 9.3z"
      />
    </svg>
    <!-- eslint-enable max-len -->
  </div>
</template>

<style scoped lang="scss">
.archive-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0.2rem 0.2rem 1rem hsla(0deg, 0%, 0%, 0.2);
  background: var(--color-title-container);
  padding: 0.5rem;
  width: 100%;
  color: var(--color-text-ingame);
  font-weight: bold;
  font-size: 1.25rem;
  user-select: none;

  .section-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .ordered-list {
      border-right: 0.1rem solid lightgray;
      padding-right: 0.5rem;
    }

    .title {
      padding-left: 0.5rem;
    }
  }

  .navigate-arrow {
    transform: rotate(90deg);
    cursor: pointer;
    width: 1.25rem;
    height: 1.25rem;

    path {
      fill: var(--color-text-ingame);
    }

    &.open {
      transform: rotate(0deg);
    }
  }
}
</style>
