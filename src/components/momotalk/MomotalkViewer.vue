<script setup lang="ts">
import { Ref, ref } from 'vue';
import { Momotalk } from '../../types/Chats';

const props = defineProps<{
  messageGroup: number;
  content: Momotalk[];
}>();

interface Option {
  text: string
  NextGroupId: number
}
interface CurrentMessageItem {
  text?: string
  options?: {
    current: number
    content: Option[]
  }
  left: boolean
  right: boolean
  avatar: boolean
  FavorScheduleId?: number
  NextGroupId?: number
}

const messageList: Ref<CurrentMessageItem[]> = ref([]);

async function next(NextGroupId: number) {
  let items = findItemsByGroupId(NextGroupId)
  let item = items[0]
  if (!item) {
    return
  }
  if (item.MessageCondition == 'Answer') {
    let options: Option[] = []
    for (let i of findItemsByGroupId(NextGroupId)) {
      options.push({ text: i.MessageCN!, NextGroupId: i.NextGroupId })
    }
    messageList.value.push({ left: false, right: true, avatar: false, options: { current: -1, content: options } })
    await wait(1000)
    return
  }
  else {
    messageList.value.push({ text: item.MessageCN!, left: true, right: false, avatar: true })
    await wait(1000)
    for (let i of items.slice(1)) {
      messageList.value.push({ text: i.MessageCN!, left: true, right: false, avatar: false })
      await wait(1000)
    }
  }
  let last = items.pop()
  if (last) {
    if (last.FavorScheduleId) {
      messageList.value.push({ left: false, right: false, FavorScheduleId: last.FavorScheduleId, avatar: false, NextGroupId: last.NextGroupId })
      return
    }
  }
  next(item.NextGroupId)
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function findItemsByGroupId(GroupId: number) {
  return props.content.filter(value => value.MessageGroupId == GroupId)
}

function handleOption(index: number, select: number) {
  if(messageList.value[index].options!.current!=-1 ){
    return
  }
  messageList.value[index].options!.current = select
  next(messageList.value[index].options!.content[select].NextGroupId)
}

let currentChangeOptions=ref<Option[]>([])
let currentChangeIndex=ref(0)
let showOptionChange=ref(false)
function handleChange(index:number,options:Option[]){
  currentChangeIndex.value=index
  currentChangeOptions.value=options
  showOptionChange.value=true
}
function handleChangeOption(select:number){
  messageList.value[currentChangeIndex.value].options!.current=select
  messageList.value=messageList.value.slice(0,currentChangeIndex.value+1)
  next(messageList.value[currentChangeIndex.value].options!.content[select].NextGroupId)
}
next(props.content[0].MessageGroupId)
</script>

<template>
  <div class="optionChange" v-if="showOptionChange">
    <div v-for="(i,index) in currentChangeOptions" @click="handleChangeOption(index)">
      {{i.text}}
    </div>
  </div>
  <div>{{ messageGroup }}</div>
  <div class="momotalk-main-interface flex-vertical">
    <div class="momotalk-banner flex-horizontal center">
      <!-- eslint-disable max-len -->
      <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
        id="Layer_2_00000033347787382183846980000016369978894466167968_" x="0" y="0" viewBox="0 0 512 477.9">
        <path
          d="M101.8 396.4c-53.3 0-98.4 53.8-101.8 79.5 81.4 7.9 196.1-6.8 252.1-65-74.7 13.5-135.9-5.2-150.3-14.5zM281.4 412.5c55.1 73.3 137.7 58.5 230.5 63.3 3.5-42.1-73.2-80.9-103.9-82.2-39.9 28.5-123.3 19.5-126.6 18.9z" />
        <path
          d="M256.4 0C136.8 45 31.5 151.4 31.5 259.4c0 85 68.4 153.9 195.3 137.3 3.9-.5 7.6-1.1 11.2-1.7-1.1-.4-2.1-.9-2.9-1.3-19.4-9.8-53.4-56.7-39-112.6 1.4 59.3 39.7 102.6 57.1 111 2.7 1.3 11.9 4.6 25.5 6.7 51.9 8 164.9 4.7 187.9-116.7C498.9 111.4 256.4 0 256.4 0z" />
      </svg>
      <!-- eslint-enable max-len -->
      <span>MomoTalk</span>
    </div>
    <div class="messages">
      <div v-for="(i, index) in messageList">
        <div v-if="i.left" class="messages__left">
          <span v-if="i.avatar">avatar</span>
          <div class="messages__left__text">
            {{ i.text }}
          </div>
        </div>
        <div v-if="i.right" class="messages__right">
          <div class="messages__right__options">
            <div v-for="(j, jIndex) in i.options?.content" >
              <div v-if="i.options?.current ==-1 || i.options!.current == jIndex" 
              @click="handleOption(index, jIndex)"
              @contextmenu.prevent="handleChange(index,i.options!.content)"
              >
                {{ j.text }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="i.FavorScheduleId" class="messages__left messages__favor" @click="next(i.NextGroupId!)">
          前往XX的羁绊剧情
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.momotalk-main-interface {
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
    width: 1.5rem;
    height: 1.5rem;
  }

  span {
    margin-left: 1rem;
    font-size: 1.25rem;
    font-family: 'Asap Condensed', sans-serif;
    letter-spacing: 0.05rem;
  }
}

.messages {
  width: 100%;

  &__left {
    width: 100%;
    display: flex;
    justify-content: left;

    &__text {
      background-color: aquamarine;
    }
  }

  &__right {
    width: 100%;
    display: flex;
    justify-content: right;

    &__options {
      background-color: antiquewhite;

      & div {
        div {
          border: 1px solid black;
          cursor: pointer;
        }
      }
    }
  }

  &__favor {
    cursor: pointer;
    background-color: beige;
  }
}

.optionChange{
  position: absolute;
  top: 3vh;
  right: 0;
  background-color: antiquewhite;
  & div{
    border: 1px solid black;
    cursor: pointer;
  }
}
</style>
