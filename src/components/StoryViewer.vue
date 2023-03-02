<template>
  <div class="fill-screen center">
    <div class="content-wrapper flex-vertical rounded-small">
      <div>Story ID {{ storyId }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const storyId = computed(() => route.params.id);
</script>

<style scoped></style>
