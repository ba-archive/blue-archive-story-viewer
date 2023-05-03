<template>
  <div class="fill-screen center" ref="playerContainerElement">
    <error-screen
      :route-path="route.path"
      :error-message="fetchErrorMessage"
      v-if="fetchError"
    />
    <div class="loading-container" v-if="!ready">
      <neu-progress-bar :show-percentage="true" :progress="initProgress" />
    </div>
    <div class="content-wrapper flex-vertical rounded-small">
      <neu-dialog
        v-if="!consentFromConfirmed && ready && !fetchError"
        title="提示"
        show-mask="false"
        shadow
        positive-text="明白"
        negative-text="不明白"
        @positiveClick="handleConsentFormConfirm"
      >
        <template #title-before>
          <img src="/src/assets/info.svg" />
        </template>
        <template #content>
          <div>
            <p>
              剧情播放目前处于测试阶段。该界面所有布局和行为都可能在未来改变。
            </p>
            <p style="font-size: 1.25rem; font-weight: bold; color: red">
              开始播放前，请确认系统音量是否过大。建议将系统音量调到最低，开始播放后酌情调高。
            </p>
            <p style="font-weight: bold; color: red">
              请勿在公共场合外放，以免影响他人。
            </p>
            <p>
              手机用户将自动进入全屏模式。可以点击菜单中的第一个按钮切换全屏模式。
            </p>
            <p>在 Safari 浏览器中，可能出现 BGM 和语音无法播放的情况。</p>
            <p>
              若遇到此问题，请尝试将播放器下方的<strong
                >“兼容 Apple 设备”</strong
              >开关拨至右边，并检查是否静音。
            </p>
            <p style="color: red">
              在 iPhone 的 Safari
              浏览器上，由于苹果不提供相关功能，播放器无法完美全屏。如果遇到尺寸问题，请尝试退出再进入全屏模式。
            </p>
            <p>
              如果在播放过程中遇到任何问题，或有任何疑问，欢迎
              <a href="https://space.bilibili.com/14066311" target="_blank"
                >私信管理员</a
              >
              或者
              <a
                href="https://github.com/ba-archive/blue-archive-story-viewer/issues/new/choose"
                target="_blank"
                >在 GitHub 上提交 issue</a
              >。
            </p>
            <p>
              可以通过点击左上角的老师名称修改昵称（最多 10
              个字）。剧情开始后的修改需要刷新页面方可反映。
            </p>
            <p>点击确认后，剧情将自动开始播放。</p>
          </div>
        </template>
      </neu-dialog>

      <div
        class="flex-vertical story-container"
        v-if="consentFromConfirmed && ready && !fetchError"
      >
        <div v-if="!playEnded">Story ID {{ storyId }}</div>
        <story-player
          v-if="showPlayer && !playEnded"
          :change-index="changeIndex"
          :story="story"
          class="player-container"
          :width="playerWidth"
          :height="playerHeight"
          data-url="https://yuuka.cdn.diyigemt.com/image/ba-all-data"
          language="Cn"
          :userName="userName"
          :story-summary="summary"
          :start-full-screen="startFullScreen"
          :use-mp3="useMp3"
          :use-super-sampling="useSuperSampling"
          @end="handleStoryEnd"
        />
        <div v-if="playEnded" class="flex-vertical">
          <div>播放已完成</div>
          <div class="flex-horizontal jump-container">
            <div
              @click="handleReplay"
              class="user-button shadow-near rounded-small"
            >
              {{ getI18nString(userLanguage, 'playerControl.replay') }}
            </div>
            <a
              v-if="undefined !== findPreviousStoryId()"
              :href="`/mainStory/${findPreviousStoryId()}`"
              class="user-button shadow-near rounded-small"
              >{{ getI18nString(userLanguage, 'routes.previous') }}</a
            >
            <a
              href="/mainStory"
              class="user-button shadow-near rounded-small"
              >{{ getI18nString(userLanguage, 'routes.backToIndex') }}</a
            >
            <a
              v-if="undefined !== findNextStoryId()"
              :href="`/mainStory/${findNextStoryId()}`"
              class="user-button shadow-near rounded-small"
              >{{ getI18nString(userLanguage, 'routes.next') }}</a
            >
          </div>
        </div>
        <div v-if="!playEnded" class="player-settings flex-horizontal">
          <div>
            <neu-switch :checked="useMp3" @update:value="handleUseMp3" />
            <span>{{
              getI18nString(userLanguage, 'settings.useMp3Title')
            }}</span>
          </div>
          <div class="flex-horizontal">
            <neu-switch
              :checked="![undefined, false, ''].includes(useSuperSampling)"
              @update:value="handleUseSuperSampling"
            />
            <span>{{
              getI18nString(userLanguage, 'settings.useSuperSamplingTitle')
            }}</span>
          </div>
          <div @click="changeIndex = 50">change index 50</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import StoryPlayer from 'ba-story-player';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getI18nString } from '../i18n/getI18nString';
import { stories } from '../index/mainStoryIndex';
import { useSettingsStore } from '../store/settings';
import {
  CommonStoryTextObject,
  Section,
  StoryContent,
} from '../types/StoryJson';
import { getAllFlattenedStoryIndex } from '../util/getAllFlattenedStoryIndex';
import ErrorScreen from './widgets/ErrorScreen.vue';
import NeuDialog from './widgets/NeuUI/NeuDialog.vue';
import NeuProgressBar from './widgets/NeuUI/NeuProgressBar.vue';
import NeuSwitch from './widgets/NeuUI/NeuSwitch.vue';
import { useElementSize } from '@vueuse/core';
import 'ba-story-player/dist/style.css';

const changeIndex = ref(0);

const route = useRoute();
const router = useRouter();
const storyId = computed(() => route.params.id);
const consentFromConfirmed = ref(false);
const story = ref<StoryContent>({} as StoryContent);

const settingsStore = useSettingsStore();
const userName = computed(() => settingsStore.getUsername);
const playerContainerElement = ref<HTMLElement>();
const userLanguage = computed(() => settingsStore.getLang);
const playEnded = ref(false);

const initProgress = ref(0);
const ready = ref(false);
const fetchError = ref(false);
const fetchErrorMessage = ref({});
/* eslint-disable max-len */
const summary = ref({
  chapterName: '序章',
  summary:
    '从奇怪的梦中醒来之后的[USERNAME]老师从联邦学生会的干部七神凛那里听到学生会长失踪的消息。由于学生会长失踪，学园城市基沃托斯陷入了混乱。为了解决这场混乱，老师和学生会的干部一同前往夏莱办公室。',
});
/* eslint-enable max-len */
axios
  .get(`/story/main/${storyId.value}.json`, {
    onDownloadProgress: progressEvent => {
      if (progressEvent.total) {
        initProgress.value = Math.floor(
          ((progressEvent.loaded || 0) * 100) / (progressEvent.total || 1)
        );
      } else {
        initProgress.value = Math.floor(
          ((progressEvent.loaded || 0) * 100) /
            ((progressEvent.loaded || 0) + 100)
        );
      }
    },
  })
  .then(res => {
    story.value = res.data;
  })
  .catch(err => {
    fetchError.value = true;
    fetchErrorMessage.value =
      route.params.id.toString() === '11000'
        ? err
        : '该剧情目前尚未开放，敬请期待！';
  })
  .finally(() => {
    ready.value = true;
  });

const { width: containerWidth, height: containerHeight } = useElementSize(
  playerContainerElement
);
const playerWidth = ref(0);
const playerHeight = ref(0);
const startFullScreen = ref(document.body.clientWidth < 425);
const useMp3 = computed(() => settingsStore.getUseMp3);
const useSuperSampling = computed(() => settingsStore.getUseSuperSampling);

// 检测浏览器是否为 webkit，如果是则使用 mp3
if (typeof window.webkitConvertPointFromNodeToPage === 'function') {
  settingsStore.setUseMp3(true);
}

/* eslint-disable indent */
watch(
  () => containerWidth.value,
  () => {
    playerWidth.value =
      document.body.clientWidth <= 360
        ? window.screen.availWidth - 32
        : Math.min(
            containerWidth.value - 32,
            (16 * (containerHeight.value - 32)) / 9,
            768
          );
    playerHeight.value = Math.floor(
      Math.min((playerWidth.value * 9) / 16, containerHeight.value)
    );
  },
  { immediate: true }
);
/* eslint-enable indent */

function handleConsentFormConfirm() {
  consentFromConfirmed.value = true;
  // 不是第一次直接刷新
  (window as any).hasStoryPlayed = true;
}

const showPlayer = ref(true);

function reloadPlayer(forceReload = false) {
  if (!forceReload) {
    showPlayer.value = false;
    setTimeout(() => {
      showPlayer.value = true;
    }, 0);
    return;
  }
  setTimeout(() => {
    router.go(0);
  }, 375);
}

const allStoryIndex = getAllFlattenedStoryIndex(stories);

const currentStoryIndexUnit: Section | undefined = allStoryIndex.find(
  story => story.story_id === parseInt(storyId.value as string)
);

function getTextByLanguage(textObject: CommonStoryTextObject | undefined) {
  if (!textObject) {
    return 'No corresponding text found / 未找到对应文本';
  }
  return (
    Reflect.get(
      textObject,
      `Text${
        userLanguage.value.slice(0, 1).toUpperCase() +
        userLanguage.value.slice(1)
      }`
    ) || 'No corresponding text found / 未找到对应文本'
  );
}

function handleSummaryDisplayLanguageChange() {
  summary.value = {
    chapterName: getTextByLanguage(currentStoryIndexUnit?.title),
    summary: getTextByLanguage(currentStoryIndexUnit?.summary),
  };
}

watch(
  () => userLanguage.value,
  () => {
    showPlayer.value = false;
    handleSummaryDisplayLanguageChange();
    reloadPlayer();
  }
);

handleSummaryDisplayLanguageChange();

function handleUseMp3(value: boolean) {
  settingsStore.setUseMp3(value);
  reloadPlayer();
}

function handleUseSuperSampling(value: boolean) {
  console.log('超分选项：' + value ? '2倍' : '关闭');
  settingsStore.setUseSuperSampling(value ? '2' : '');
  reloadPlayer();
}

function findPreviousStoryId(): number | undefined {
  if (currentStoryIndexUnit?.previous) {
    return currentStoryIndexUnit.previous;
  }
  return undefined;
}

function findNextStoryId(): number | undefined {
  if (currentStoryIndexUnit?.next) {
    return currentStoryIndexUnit.next;
  }
  return undefined;
}

function handleStoryEnd() {
  console.log('story end');
  playEnded.value = true;
}

function handleReplay() {
  playEnded.value = false;
  reloadPlayer();
}
</script>

<style scoped lang="scss">
.story-container {
  .player-settings {
    margin-top: 1rem;
    user-select: none;
  }
}

.jump-container {
  gap: 1rem;
  margin-top: 1rem;

  .user-button {
    cursor: pointer;
    background-color: var(--color-option-button);
    padding: 0.5rem;
    width: fit-content;
    color: var(--color-text-ingame);
    text-decoration: none;
  }
}

.player-container {
  user-select: none;
}

:deep(.pseudo-fullscreen) {
  z-index: 512 !important;
}
</style>
