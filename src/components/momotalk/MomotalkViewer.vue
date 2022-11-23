<script setup lang="ts">
import { Momotalk } from '../../types/Chats';

defineProps<{
  messageGroup: number;
  content: Momotalk[] | undefined;
}>();
</script>

<template>
  <div>{{ messageGroup }}</div>
  <div>{{ content }}</div>
</template>

<style scoped lang="scss"></style>
