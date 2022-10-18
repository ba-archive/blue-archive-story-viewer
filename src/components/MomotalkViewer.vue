<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  momotalk: {
    type: Object,
    required: true,
  },
});
const talkContent = ref([]);

const url = `/config/json/archive/${route.params.id}/momotalk/${props.momotalk.file}.json`;

axios.get(url).then((res) => {
  talkContent.value = res.data;
});
</script>

<template>
  <div>{{ talkContent }}</div>
</template>

<style scoped lang="scss"></style>
