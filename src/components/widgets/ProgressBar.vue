<template>
  <div class="progress-bar-container">
    <div class="percentage" v-if="showPercentage">{{ progress }}%</div>
    <div class="progress-bar-background">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  progress: {
    type: Number,
    default: 0,
    required: true,
  },
  showPercentage: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<style scoped lang="scss">
.progress-bar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 20rem;

  .percentage {
    color: var(--color-text-main);
  }
  .progress-bar-background {
    border-radius: 0.5rem;
    background-color: #d3d3d3;
    width: 100%;
    height: 0.5rem;

    .progress {
      border-radius: 0.5rem;
      background-color: #006bff;
      height: 100%;
    }
  }
}

@media (max-width: 768px) {
  .progress-bar-container {
    max-width: calc(100% - 2rem);
  }
}
</style>
