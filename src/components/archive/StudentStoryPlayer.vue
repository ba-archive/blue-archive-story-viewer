<template>
  <div class="flex-vertical fill-width">
    <error-screen
      v-if="fetchError"
      :error-message="fetchErrorMessage"
      :route-path="route.path"
    />
    <div class="loading-container" v-if="!ready">
      <neu-progress-bar :show-percentage="true" :progress="initProgress" />
    </div>

    <neu-dialog
      v-if="!consentFromConfirmed"
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
          <p>
            在 iPhone、iPad 以及 MacBook 的 Safari 浏览器中，可能出现 BGM
            和语音无法播放的情况。
          </p>
          <p>
            若遇到此问题，请尝试将播放器下方的<strong>“兼容 Apple 设备”</strong
            >开关拨至右边，并检查是否静音。
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
      <div>Story ID {{ favorGroupId }}</div>
      <story-player
        :story="story.content"
        class="player-container"
        :width="playerWidth"
        :height="playerHeight"
        data-url="https://yuuka.cdn.diyigemt.com/image/ba-all-data"
        language="Cn"
        :userName="userName"
        :story-summary="storySummary"
        :start-full-screen="startFullScreen"
        :use-mp3="useMp3"
      />
      <div class="player-settings flex-vertical">
        <div>
          <neu-switch :checked="useMp3" @update:value="handleUseMp3" />
          <span>兼容 Apple 设备</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import StoryPlayer from 'ba-story-player';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSettingsStore } from '../../store/settings';
import { StoryContent } from '../../types/StoryJson';
import ErrorScreen from '../widgets/ErrorScreen.vue';
import NeuDialog from '../widgets/NeuUI/NeuDialog.vue';
import NeuProgressBar from '../widgets/NeuUI/NeuProgressBar.vue';
import NeuSwitch from '../widgets/NeuUI/NeuSwitch.vue';
import 'ba-story-player/dist/style.css';

const route = useRoute();
const router = useRouter();
const settingsStore = useSettingsStore();

const ready = ref(false);
const initProgress = ref(0);
// get 请求是否出错
const fetchError = ref(false);
const fetchErrorMessage = ref({});

const studentId = computed(() => route.params.id);
const favorGroupId = computed(() => route.params.groupId);

const story = ref<StoryContent>({} as StoryContent);
const storySummary = ref({
  chapterName: '',
  summary: '',
});
const userName = computed(() => settingsStore.getUsername);
const consentFromConfirmed = ref(false);

axios
  .get(`/story/favor/${studentId.value}/${favorGroupId.value}.json`, {
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
    storySummary.value.chapterName = res.data.title.TextCn;
    storySummary.value.summary = res.data.abstract.TextCn;
  })
  .catch(err => {
    console.error(err);
    fetchError.value = true;
    fetchErrorMessage.value = err;
  })
  .finally(() => {
    ready.value = true;
  });

const playerWidth = document.body.clientWidth < 425 ? 360 : 720;
const playerHeight = playerWidth * 0.5625;
const startFullScreen = ref(document.body.clientWidth < 425);
const useMp3 = computed(() => settingsStore.getUseMp3);

// 检测浏览器是否为 webkit，如果是则使用 mp3
/* eslint-disable-next-line */
// @ts-ignore
if (typeof window.webkitConvertPointFromNodeToPage === 'function') {
  settingsStore.setUseMp3(true);
}

function handleConsentFormConfirm() {
  consentFromConfirmed.value = true;
}

function handleUseMp3(value: boolean) {
  settingsStore.setUseMp3(value);
  setTimeout(() => {
    router.go(0);
  }, 375); // 等动画结束之后刷新页面
}
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 1rem;
}

@media (max-width: 425px) {
  .story-container {
    transform: rotate(270deg);
  }
}

.story-container {
  .player-settings {
    margin-top: 1rem;
  }
}
</style>
