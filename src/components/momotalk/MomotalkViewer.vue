<script setup lang="ts">
import { PropType, Ref, ref } from 'vue';
import {
  CurrentMessageItem,
  Momotalk,
  SelectionOption,
} from '../../types/Chats';
import MomoTalkComponent from './MomoTalkComponent.vue';

const props = defineProps({
  messageGroup: Number,
  translate: {
    type: String,
    default: '',
    required: false,
  },
  content: Object as PropType<Momotalk[]>,
});

let nextId = ref(0);
const messageList: Ref<CurrentMessageItem[]> = ref([]);

async function next(NextGroupId: number, id: number) {
  if (nextId.value != id) {
    return;
  }
  const messageGroupElements = findItemsByGroupId(NextGroupId);
  const firstMessageGroupElement = messageGroupElements[0];
  if (!firstMessageGroupElement) {
    // NextGroupId 没有返回结果，聊天结束
    return;
  }
  if (firstMessageGroupElement.MessageCondition == 'Answer') {
    // 遇到玩家选项，需要合并后发送给子组件
    const options: SelectionOption[] = [];
    const answerElements = findItemsByGroupId(NextGroupId);
    const favorScheduleId =
      answerElements.find(element => element.FavorScheduleId !== 0)
        ?.FavorScheduleId || 0;
    for (const answerElement of answerElements) {
      options.push({
        MessageCN: answerElement.MessageCN,
        MessageJP: answerElement.MessageJP,
        MessageEN: answerElement.MessageEN,
        MessageKR: answerElement.MessageKR,
        MessageTH: answerElement.MessageTH,
        MessageTW: answerElement.MessageTW,
        NextGroupId: answerElement.NextGroupId,
      });
    }
    if (nextId.value != id) {
      return;
    }
    messageList.value.push({
      avatar: false,
      MessageGroupId: firstMessageGroupElement.MessageGroupId,
      Id: firstMessageGroupElement.Id,
      CharacterId: firstMessageGroupElement.CharacterId,
      ConditionValue: 0,
      PreConditionGroupId: 0,
      FavorScheduleId: favorScheduleId,
      NextGroupId: 0,
      FeedbackTimeMillisec: 0,
      MessageCondition: 'Answer',
      options: { current: -1, content: options },
      MessageType: 'Text',
      ImagePath: '',
    });
    await wait(1000);
    return;
  } else {
    if (nextId.value != id) {
      return;
    }
    // 不需要玩家选择（即学生发给玩家的信息）
    messageList.value.push({
      avatar: true,
      MessageGroupId: firstMessageGroupElement.MessageGroupId,
      Id: firstMessageGroupElement.Id,
      CharacterId: firstMessageGroupElement.CharacterId,
      ConditionValue: firstMessageGroupElement.ConditionValue,
      PreConditionGroupId: firstMessageGroupElement.PreConditionGroupId,
      FavorScheduleId: firstMessageGroupElement.FavorScheduleId,
      NextGroupId: firstMessageGroupElement.NextGroupId,
      FeedbackTimeMillisec: firstMessageGroupElement.FeedbackTimeMillisec,
      MessageCondition: firstMessageGroupElement.MessageCondition,
      MessageType: firstMessageGroupElement.MessageType,
      ImagePath: firstMessageGroupElement.ImagePath,
      MessageJP: firstMessageGroupElement.MessageJP,
      MessageCN: firstMessageGroupElement.MessageCN,
      MessageEN: firstMessageGroupElement.MessageEN,
      MessageKR: firstMessageGroupElement.MessageKR,
      MessageTH: firstMessageGroupElement.MessageTH,
      MessageTW: firstMessageGroupElement.MessageTW,
    });
    await wait(1000);
    for (let currentMessageItem of messageGroupElements.slice(1)) {
      if (nextId.value != id) {
        return;
      }
      messageList.value.push({
        avatar: false,
        MessageGroupId: currentMessageItem.MessageGroupId,
        Id: currentMessageItem.Id,
        CharacterId: currentMessageItem.CharacterId,
        ConditionValue: currentMessageItem.ConditionValue,
        PreConditionGroupId: currentMessageItem.PreConditionGroupId,
        FavorScheduleId: currentMessageItem.FavorScheduleId,
        NextGroupId: currentMessageItem.NextGroupId,
        FeedbackTimeMillisec: currentMessageItem.FeedbackTimeMillisec,
        MessageCondition: currentMessageItem.MessageCondition,
        MessageType: currentMessageItem.MessageType,
        ImagePath: currentMessageItem.ImagePath,
        MessageJP: currentMessageItem.MessageJP,
        MessageCN: currentMessageItem.MessageCN,
        MessageEN: currentMessageItem.MessageEN,
        MessageKR: currentMessageItem.MessageKR,
        MessageTH: currentMessageItem.MessageTH,
        MessageTW: currentMessageItem.MessageTW,
      });
      await wait(1000);
    }
  }
  await next(firstMessageGroupElement.NextGroupId, id);
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function findItemsByGroupId(GroupId: number) {
  return props.content?.filter(
    value => value.MessageGroupId == GroupId
  ) as Momotalk[];
}

const showOptionChange = ref(false);

// 处理用户选择和重新选择事件
function handleUserSelect(Id: number, nextGroupId: number) {
  const selectionIndex = messageList.value.findIndex(value => value.Id === Id);
  messageList.value = messageList.value.slice(0, selectionIndex + 1);
  nextId.value++;
  next(nextGroupId, nextId.value);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
next(props.content[0].MessageGroupId, 0);
</script>

<template>
  <div class="optionChange" v-if="showOptionChange"></div>
  <div>{{ messageGroup }}</div>
  <div class="momotalk-main-interface flex-vertical">
    <div class="momotalk-banner flex-horizontal center">
      <!-- eslint-disable max-len -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        id="Layer_2_00000033347787382183846980000016369978894466167968_"
        x="0"
        y="0"
        viewBox="0 0 512 477.9"
      >
        <path
          d="M101.8 396.4c-53.3 0-98.4 53.8-101.8 79.5 81.4 7.9 196.1-6.8 252.1-65-74.7 13.5-135.9-5.2-150.3-14.5zM281.4 412.5c55.1 73.3 137.7 58.5 230.5 63.3 3.5-42.1-73.2-80.9-103.9-82.2-39.9 28.5-123.3 19.5-126.6 18.9z"
        />
        <path
          d="M256.4 0C136.8 45 31.5 151.4 31.5 259.4c0 85 68.4 153.9 195.3 137.3 3.9-.5 7.6-1.1 11.2-1.7-1.1-.4-2.1-.9-2.9-1.3-19.4-9.8-53.4-56.7-39-112.6 1.4 59.3 39.7 102.6 57.1 111 2.7 1.3 11.9 4.6 25.5 6.7 51.9 8 164.9 4.7 187.9-116.7C498.9 111.4 256.4 0 256.4 0z"
        />
      </svg>
      <!-- eslint-enable max-len -->
      <div class="momotalk-title-text">
        <span class="title">MomoTalk</span>
        <div class="credit">
          <span>translated by </span>
          <span v-if="translate">{{ translate }}@</span>
          <a href="https://space.bilibili.com/37507923" target="_blank">
            碧蓝档案资讯站
          </a>
        </div>
      </div>
    </div>
    <div class="messages">
      <momo-talk-component
        v-for="(message, index) in messageList"
        :key="index"
        :message="message"
        @userSelect="handleUserSelect"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.momotalk-main-interface {
  width: 100%;
}

.messages {
  width: 100%;
}

.momotalk-banner {
  background-color: var(--color-momotalk-background);
  padding: 0.5rem;
  width: 100%;
  color: var(--color-momotalk-banner-text);
  user-select: none;

  svg {
    fill: var(--color-momotalk-banner-text);
    width: 2rem;
    height: 2rem;
  }

  .momotalk-title-text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 0.5rem;
    font-style: italic;
    font-size: 1.25rem;
    font-family: 'Asap Condensed', 'Microsoft YaHei', 'PingFang SC',
      -apple-system, system-ui, 'Segoe UI', Roboto, Ubuntu, Cantarell,
      'Noto Sans', BlinkMacSystemFont, 'Helvetica Neue', 'Hiragino Sans GB',
      Arial, sans-serif;

    .title {
      letter-spacing: 0.05rem;
    }

    .credit {
      font-size: 0.5rem;

      a {
        display: inline-flex;
        color: var(--color-momotalk-banner-text);
      }
    }
  }

  .messages {
    width: 100%;
  }
}
</style>
