<script setup lang="ts">
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { mainStore } from "../store/store";
import { Chat } from "../types/Chats";
import MomotalkViewer from "./MomotalkViewer.vue";
import StudentArchiveTitle from "./StudentArchiveTitle.vue";

interface Momotalks {
  chats: Chat[];
  student_id: number;
}

const store = mainStore();

const momotalks: Ref<Momotalks> = ref({
  chats: [{ file: "", title: { zh: "", jp: "" } }],
  student_id: 0,
});
const opentalks: Ref<number[]> = ref([]);
const route = useRoute();

axios
  .get(`/config/json/archive/${route.params.id}/momotalk/index.json`)
  .then((res) => {
    momotalks.value = res.data;
  });

function handleOpenTalks(index: number) {
  if (opentalks.value.includes(index)) {
    opentalks.value = opentalks.value.filter((i) => i !== index);
  } else {
    opentalks.value.push(index);
  }
}
</script>

<template>
  <div class="flex-vertical rounded-small">
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
