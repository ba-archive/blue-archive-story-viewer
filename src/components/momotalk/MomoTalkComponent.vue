<template>
  <div>{{ message.MessageCN }}</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Momotalk } from '../../types/Chats';

defineProps({
  message: Object as PropType<Momotalk>,
});
</script>

<style scoped></style>
