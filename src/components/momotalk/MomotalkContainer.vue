<script setup lang="ts">
import axios from 'axios';
import { Ref, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSettingsStore } from '../../store/settings';
import { Momotalk, SplitMomotalk } from '../../types/Chats';
import { Momotalks } from '../../types/Chats';
import ErrorScreen from '../widgets/ErrorScreen.vue';
import StudentArchiveTitle from '../widgets/StudentArchiveTitle.vue';
import MomotalkViewer from './MomotalkViewer.vue';

const settingsStore = useSettingsStore();

const language = computed(() => settingsStore.getLang);

const momotalks: Ref<Momotalks> = ref({
  CharacterId: 0,
  translate: '',
  title: [],
  content: [],
  splitMomotalk: [],
});
const opentalks: Ref<number[]> = ref([]);
const route = useRoute();

function getSplitMomotalk(momotalkContent: Momotalk[]): SplitMomotalk[] {
  const splitMomotalk: SplitMomotalk[] = [];

  if (!momotalkContent) {
    throw new Error(`Momotalk content cannot be ${momotalkContent}`);
  }

  for (const chat of momotalkContent) {
    if (0 === splitMomotalk.length) {
      // 初始状态，第一条的 ConditionValue 必不为 0
      splitMomotalk.push({
        FavorScheduleId: parseInt(
          chat.CharacterId.toString() +
            chat.ConditionValue.toString().padStart(2, '0')
        ),
        splitMomotalkContent: [chat],
      });
    } else {
      // 数组内已经有东西，判断该条的 ConditionValue 是否为 0，是则承接，不是则新开
      if (0 === chat.ConditionValue) {
        splitMomotalk[splitMomotalk.length - 1].splitMomotalkContent.push(chat);
      } else {
        splitMomotalk.push({
          FavorScheduleId: parseInt(
            chat.CharacterId.toString() +
              chat.ConditionValue.toString().padStart(2, '0')
          ),
          splitMomotalkContent: [chat],
        });
      }
    }
  }

  return splitMomotalk;
}

const fetchError = ref(false);
const fetchErrorMessage = ref({});

axios
  .get(`/config/json/momotalk/${route.params.id}.json`)
  .then(res => {
    const data = res.data as Momotalks;
    momotalks.value.CharacterId = data.CharacterId;
    momotalks.value.translator = data.translator;
    momotalks.value.title = data.title;
    momotalks.value.content = data.content;

    momotalks.value.splitMomotalk = getSplitMomotalk(data.content);
  })
  .catch(e => {
    console.error(e);
    fetchError.value = true;
    fetchErrorMessage.value = e;
  });

function handleOpenTalks(index: number) {
  if (opentalks.value.includes(index)) {
    opentalks.value = opentalks.value.filter(i => i !== index);
  } else {
    opentalks.value.push(index);
  }
}

function getRelatedChat(GroupId: number): Momotalk[] | undefined {
  return momotalks.value.splitMomotalk.find(e => e.FavorScheduleId === GroupId)
    ?.splitMomotalkContent;
}

function getStudentAvatar(CharacterId: number): string {
  return `/image/avatar_students/${CharacterId}.webp`;
}
</script>

<template>
  <error-screen
    :route-path="route.path"
    :error-message="fetchErrorMessage"
    v-if="fetchError"
  />
  <div class="momotalk-component-container">
    <div
      class="momotalks-view-container flex-vertical"
      v-for="(chat, index) in momotalks.title"
      :key="index"
    >
      <student-archive-title
        @clicked="handleOpenTalks(index)"
        :avatar="getStudentAvatar(momotalks.CharacterId)"
        :title="chat"
        :language="language"
        :index="index"
        :is-active="opentalks.includes(index)"
      />
      <momotalk-viewer
        :messageGroup="chat.GroupId"
        :translator="momotalks.translator"
        :content="getRelatedChat(chat.GroupId)"
        v-if="opentalks.includes(index)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.momotalk-component-container {
  grid-gap: 1rem;
  display: grid;
  grid-auto-flow: row;
  place-items: center;
}
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

@media screen and (max-width: 768px) {
  .momotalks-view-container {
    max-width: calc(100vw - 2rem);
  }
}
</style>
