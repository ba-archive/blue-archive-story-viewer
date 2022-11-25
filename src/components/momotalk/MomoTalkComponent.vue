<template>
  <div
    class="momotalk-unit"
    :class="
      !message?.avatar && 'Answer' !== messageCondition ? 'condensed' : ''
    "
  >
    <div class="student-reply" v-if="'Answer' !== messageCondition">
      <img
        class="student-avatar"
        :class="message?.avatar ? '' : 'hidden'"
        :src="studentAvatar"
      />
      <div class="message-content-wrap rounded-small">
        <span v-if="'Image' !== messageType">{{
          getMessageText(message)
        }}</span>
        <img v-else :src="getMessageImagePath(message?.ImagePath)" />
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
        >
          {{ getMessageText(option) }}
        </div>
      </div>
    </div>
  </div>

  <div class="momotalk-unit" v-if="0 !== message?.FavorScheduleId">
    <div class="favor-schedule-unit rounded-small">
      <div class="favor-schedule-banner">
        <span>羁绊事件</span>
      </div>
      <div
        role="button"
        class="favor-schedule-button rounded-small shadow-near"
      >
        前往{{ studentName }}的羁绊事件
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { useSettingsStore } from '../../store/settings';
import { useStudentStore } from '../../store/students';
import { CurrentMessageItem, MessageText } from '../../types/Chats';
import { StudentName } from '../../types/Student';

const props = defineProps({
  message: Object as PropType<CurrentMessageItem>,
});

const settingsStore = useSettingsStore();
const studentStore = useStudentStore();
const selectedLang = computed(() => settingsStore.getLang.replace('cn', 'zh'));

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
  currentSelection.value = selected;
  emit('userSelect', Id || 0, nextGroupId);
}

function stripRubyContent(content: string | undefined): string {
  if (!content) {
    return '';
  }
  return content.replaceAll(/\[\/?ruby=?.*?]/gi, '');
}

function getFallBackText(message: MessageText | CurrentMessageItem): string {
  if (message.MessageCN) {
    return stripRubyContent(message.MessageCN);
  } else if (message.MessageTW) {
    return stripRubyContent(message.MessageTW);
  } else if (message.MessageJP) {
    return stripRubyContent(message.MessageJP);
  } else if (message.MessageEN) {
    return stripRubyContent(message.MessageEN);
  } else if (message.MessageKR) {
    return stripRubyContent(message.MessageKR);
  } else if (message.MessageTH) {
    return stripRubyContent(message.MessageTH);
  } else {
    return 'NoFallbackText';
  }
}

function getTextInLang(
  selectedLang: string,
  content: MessageText | CurrentMessageItem
): string | undefined {
  let text;
  if ('zh' === selectedLang) {
    text = stripRubyContent(content.MessageCN);
  } else if ('jp' === selectedLang) {
    text = stripRubyContent(content.MessageJP);
  } else if ('en' === selectedLang) {
    text = stripRubyContent(content.MessageEN);
  } else if ('kr' === selectedLang) {
    text = stripRubyContent(content.MessageKR);
  } else if ('th' === selectedLang) {
    text = stripRubyContent(content.MessageTH);
  } else if ('tw' === selectedLang) {
    text = stripRubyContent(content.MessageTW);
  }
  return text || undefined;
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
    margin-top: 0.1rem;
  }
}
.student-reply {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.student-avatar {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  object-fit: cover;

  &.hidden {
    visibility: hidden;
    height: 0;
  }
}

.message-content-wrap {
  margin-left: 0.5rem;
  background-color: #505a6d;
  padding: 0.5rem;
  width: fit-content;
  color: var(--color-text-contrast);

  img {
    width: 10rem;
    height: auto;
  }
}

.user-reply {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: auto;
  border: 1px solid lightgray;
  background-color: #e5ebf1;
  padding: 0.5rem;

  .user-reply-banner {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-bottom: 1px solid lightgray;
    width: 100%;
    color: var(--color-text-ingame);

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
  margin-left: auto;
  border: 1px solid lightgray;
  background: #fceef2 url('/src/assets/heart.svg') no-repeat right -25% center;
  padding: 0.5rem;

  .favor-schedule-banner {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-bottom: 1px solid lightgray;
    width: 100%;
    color: var(--color-text-ingame);

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
    cursor: pointer;
    margin-top: 1rem;
    background-color: #ff92a4;
    padding: 0.5rem;
    color: var(--color-text-contrast);
  }
}
</style>
