<template>
  <div
    class="momotalk-unit"
    :class="
      !message?.avatar && 'Answer' !== messageCondition ? 'condensed' : ''
    "
    v-scroll-into-view
  >
    <div class="student-reply" v-if="'Answer' !== messageCondition">
      <img
        class="student-avatar"
        :class="message?.avatar ? '' : 'hidden'"
        :src="studentAvatar"
        :alt="studentName"
      />

      <div class="message-text flex-vertical">
        <div class="student-name" v-if="message?.avatar">
          {{ studentName }}
        </div>
        <div class="message-content-wrap rounded-small">
          <div v-if="!showMessageContent" class="typing-indicator">
            <span class="dot-1">·</span>
            <span class="dot-2">·</span>
            <span class="dot-3">·</span>
          </div>
          <div v-show="showMessageContent" class="message-content">
            <span
              v-if="'Image' !== messageType"
              v-html="getMessageText(message)"
            ></span>
            <img
              v-else
              :src="getMessageImagePath(message?.ImagePath)"
              alt="聊天图片"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="'Answer' === messageCondition" class="user-reply rounded-small">
      <div class="user-reply-banner">
        <span>回复</span>
      </div>
      <div class="select-options flex-vertical">
        <div
          role="button"
          class="rounded-small shadow-near"
          v-for="(option, index) in message?.options?.content"
          :key="index"
          :class="index === currentSelection ? 'selected' : ''"
          @click="handleSelection(index, message?.Id, option.NextGroupId)"
          v-html="getMessageText(option)"
        ></div>
      </div>
    </div>
  </div>

  <div
    class="momotalk-unit"
    v-if="0 !== message?.FavorScheduleId && showFavorMessageContent"
    v-scroll-into-view
  >
    <div class="favor-schedule-unit rounded-small">
      <div class="favor-schedule-banner">
        <span>羁绊事件</span>
      </div>
      <router-link
        :to="`/archive/${characterId}/story`"
        role="button"
        class="favor-schedule-button rounded-small shadow-near"
        >前往{{ studentName }}的羁绊事件</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue';
import { useSettingsStore } from '../../store/settings';
import { useStudentStore } from '../../store/students';
import { CurrentMessageItem, MessageText } from '../../types/Chats';
import { StudentName } from '../../types/Student';

const props = defineProps({
  message: Object as PropType<CurrentMessageItem>,
  shouldComponentUpdate: Boolean,
});

const vScrollIntoView = {
  mounted(el: HTMLElement) {
    el.scrollIntoView();
  },
};

const settingsStore = useSettingsStore();
const studentStore = useStudentStore();
const selectedLang = computed(() => settingsStore.getLang.replace('zh', 'cn'));

const characterId = props.message?.CharacterId || 10000;
const studentInfo = studentStore.getStudentById(characterId);
const studentName = computed(() => {
  return (
    (studentInfo?.name[selectedLang.value as keyof StudentName] as
      | string
      | undefined) || ''
  );
});
const messageCondition = props.message?.MessageCondition || 'None';
const messageType = props.message?.MessageType || 'Text';
const studentAvatar = `/image/avatar_students/${characterId}.webp`;

const currentSelection = ref(-1);

const showMessageContent = ref(false);
const showFavorMessageContent = ref(false);
// 这里是故意用 || 而不是 ?? 的，不然第一条消息需要等待太久，用户体验不好
const feedbackTime = props.message?.FeedbackTimeMillisec || 1000;

function animateMessage() {
  setTimeout(() => {
    showMessageContent.value = true;
  }, feedbackTime);
  setTimeout(() => {
    showFavorMessageContent.value = true;
  }, feedbackTime + 500);
}

animateMessage();

watch(
  () => props.shouldComponentUpdate,
  newValue => {
    if (!newValue) {
      return;
    }
    showMessageContent.value = false;
    showFavorMessageContent.value = false;
    currentSelection.value = -1;
    animateMessage();
  }
);

function getMessageImagePath(originPath: string | undefined): string {
  if (originPath) {
    const fileName = originPath.split('/').pop();
    return `/image/ScenarioImage/${fileName}.png`;
  }
  return '';
}

const emit = defineEmits(['userSelect']);

function handleSelection(
  selected: number,
  Id: number | undefined,
  nextGroupId: number
) {
  if (selected === currentSelection.value) {
    return;
  }
  currentSelection.value = selected;
  emit('userSelect', Id || 0, nextGroupId);
}

function stripRubyContent(content: string | undefined): string {
  if (!content) {
    return '';
  }
  return content
    .replaceAll(/\[\/?ruby=?.*?]/gi, '')
    .replaceAll(/\s/g, '&nbsp;');
}

const languageMap = {
  cn: 'MessageCN',
  zh: 'MessageCN',
  tw: 'MessageTW',
  en: 'MessageEN',
  jp: 'MessageJP',
  kr: 'MessageKR',
  th: 'MessageTH',
};

function getFallBackText(message: MessageText | CurrentMessageItem): string {
  for (const lang in languageMap) {
    const text = Reflect.get(message, Reflect.get(languageMap, lang));
    if (text) {
      return text;
    }
  }
  return 'NoFallbackText';
}

function getTextInLang(
  selectedLang: string,
  content: MessageText | CurrentMessageItem
): string | undefined {
  const text = Reflect.get(content, Reflect.get(languageMap, selectedLang));
  return stripRubyContent(text);
}

function getMessageText(
  messageText: MessageText | CurrentMessageItem | undefined
): string {
  if (messageText) {
    let text = getTextInLang(selectedLang.value, messageText);
    if (text) {
      return text;
    } else {
      return `!Fallback:${getFallBackText(messageText)}`;
    }
  }
  return '';
}
</script>

<style scoped lang="scss">
.momotalk-unit {
  display: flex;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  width: 100%;

  &.condensed {
    margin-top: 0.3rem;
  }
}
.student-reply {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.student-avatar {
  flex: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  object-fit: cover;

  &.hidden {
    visibility: hidden;
    height: 0;
  }
}
.message-text {
  align-items: flex-start;
  margin-left: 0.5rem;

  .student-name {
    transition: color 0.375s ease-in-out;
    font-weight: bold;
    font-size: 1rem;
  }

  .message-content-wrap {
    transition: color 0.375s ease-in-out;
    background-color: #505a6d;
    padding: 0.5rem;
    width: fit-content;
    color: var(--color-text-contrast);

    img {
      width: 10rem;
      height: auto;
    }
  }
}

.typing-indicator {
  .dot-1 {
    animation: typing 1.5s infinite;
  }
  .dot-2 {
    animation: typing 1.5s infinite;
    animation-delay: 0.2s;
  }
  .dot-3 {
    animation: typing 1.5s infinite;
    animation-delay: 0.4s;
  }
}

@keyframes typing {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.user-reply {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.375s ease-in-out;
  margin-left: auto;
  border: 1px solid var(--color-momotalk-user-action-border);
  background-color: var(--color-momotalk-user-reply-background);
  padding: 0.5rem;

  .user-reply-banner {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    transition: all 0.375s ease-in-out;
    border-bottom: 1px solid var(--color-momotalk-user-action-border);
    width: 100%;
    color: var(--color-text-ingame);
    user-select: none;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      white-space: nowrap;

      &::before {
        display: inline-block;
        margin-right: 0.5rem;
        border-radius: 0.5px;
        background-color: #3493f9;
        width: 0.1rem;
        height: 1rem;
        content: '';
      }
    }
  }

  .select-options {
    grid-gap: 0.5rem;
    display: grid;
    grid-auto-flow: row;
    margin-top: 1rem;
    min-width: 50%;

    div {
      cursor: pointer;
      background-color: var(--color-option-button);
      padding: 0.5rem;
      user-select: none;

      &.selected {
        background-color: #5889c4;
        color: #fff;
      }
    }
  }
}

.favor-schedule-unit {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.375s ease-in-out;
  margin-left: auto;
  border: 1px solid var(--color-momotalk-user-action-border);
  background: var(--color-momotalk-favor-schedule-background)
    url('/src/assets/heart.svg') no-repeat right -25% center;
  padding: 0.5rem;

  .favor-schedule-banner {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    transition: all 0.375s ease-in-out;
    border-bottom: 1px solid var(--color-momotalk-user-action-border);
    width: 100%;
    color: var(--color-text-ingame);
    user-select: none;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      white-space: nowrap;

      &::before {
        display: inline-block;
        margin-right: 0.5rem;
        border-radius: 0.5px;
        background-color: #ff92a4;
        width: 0.1rem;
        height: 1rem;
        content: '';
      }
    }
  }

  .favor-schedule-button {
    transition: color 0.375s ease-in-out;
    cursor: pointer;
    margin-top: 1rem;
    background-color: #ff92a4;
    padding: 0.5rem;
    color: var(--color-text-contrast);
    user-select: none;
    text-decoration: none;
  }
}
</style>
