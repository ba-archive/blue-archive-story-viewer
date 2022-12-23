<script setup lang="ts">
import axios from 'axios';
import { Ref, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSettingsStore } from '../../store/settings';
import { Momotalk, SplitMomotalk } from '../../types/Chats';
import { Momotalks } from '../../types/Chats';
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
const fetchErrorMessage = ref('');

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
    fetchError.value = true;
    fetchErrorMessage.value = e.message;
    console.error(e);
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
  <div class="error-container" v-if="fetchError">
    <img src="/src/assets/network-error.svg" alt="Network Error" />
    <div class="error-message">
      <p>数据加载失败，请刷新页面重试。</p>
      <!--eslint-disable max-len-->
      <p>
        如果多次刷新页面仍无效，请
        <a
          :href="`mailto:mail@blue-archive.io?subject=%E9%94%99%E8%AF%AF%E6%8A%A5%E5%91%8A%EF%BC%88blue-archive.io%EF%BC%89&body=Fetch failed with /config/json/momotalk/${route.params.id}.json: %0D%0A%0D%0A${fetchErrorMessage}%0D%0A%0D%0AOrigin: ${route.path}`"
          target="_blank"
          >联系我们</a
        >。
      </p>
      <!--eslint-enable max-len-->
      <p class="error-content">Error: {{ fetchErrorMessage }}</p>
    </div>
  </div>
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
