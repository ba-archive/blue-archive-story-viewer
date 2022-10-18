<script setup>
const emit = defineEmits(["clicked"]);
defineProps({
  title: { type: String, required: true },
  index: { type: Number, required: false },
  isActive: { type: Boolean, required: false },
});

function handleClick() {
  emit("clicked");
}
</script>

<template>
  <div
    class="archive-title"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <p class="section-title">
      <span class="ordered-list">{{
        (index + 1).toString().padStart(2, "0")
      }}</span>
      <span class="title">{{ title }}</span>
    </p>
    <img
      class="navigate"
      src="/src/assets/navigate-down.svg"
      :class="isActive ? 'open' : ''"
      alt="navigate"
      role="button"
    />
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
  border-radius: 0.5rem;
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

  .navigate {
    transform: rotate(90deg);
    cursor: pointer;
    width: 1.25rem;
    height: 1.25rem;

    &.open {
      transform: rotate(0deg);
    }
  }
}
</style>
