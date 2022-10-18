<script setup>
import axios from "axios";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { mainStore } from "../store/store.js";
import MomotalkViewer from "./MomotalkViewer.vue";
import StudentArchiveTitle from "./StudentArchiveTitle.vue";

const store = mainStore();

const momotalks = ref([]);
const opentalks = ref([]);
const route = useRoute();

axios
  .get(`/config/json/archive/${route.params.id}/momotalk/index.json`)
  .then((res) => {
    momotalks.value = res.data;
  });

function handleOpenTalks(index) {
  if (opentalks.value.includes(index)) {
    opentalks.value = opentalks.value.filter((i) => i !== index);
  } else {
    opentalks.value.push(index);
  }
}
</script>

<template>
  <div class="flex-vertical rounded">
    <div
      class="momotalks-view-container flex-vertical"
      v-for="(chat, index) in momotalks.chats"
      :key="index"
    >
      <student-archive-title
        @clicked="handleOpenTalks(index)"
        :title="chat.title[store.getLang]"
        :index="index"
        :is-active="opentalks.includes(index)"
      />
      <momotalk-viewer :momotalk="chat" v-if="opentalks.includes(index)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.momotalks-view-container {
  width: 30rem;
}

.momotalk-indicator {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 1.25rem;

  .momotalk-title {
    &::before {
      content: attr(order);
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
