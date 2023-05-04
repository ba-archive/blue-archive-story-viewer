<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getI18nString } from '../../i18n/getI18nString';
import { useSettingsStore } from '../../store/settings';
import { HomeDisplayInfo } from '../HomeWelcomeScreen.vue';
import NeuDialog from './NeuUI/NeuDialog.vue';

const settingsStore = useSettingsStore();
const router = useRouter();

const userLanguage = computed(() => settingsStore.getLang);

// vue 已经支持直接引入外部 interface了，但是 vue-tsc 还不支持，所以这里还是用了 PropType
const props = defineProps({
  info: {
    type: Object as PropType<HomeDisplayInfo>,
    required: true,
    default: () => ({
      type: 'mainstory',
      title: '主线剧情',
    }),
  },
});

function isDuringDateRange(
  startDate: string | undefined,
  endDate: string | undefined
) {
  const currentDate = new Date().getTime();
  const isAfterStartDate = startDate
    ? currentDate >= new Date(startDate.replaceAll('/', '-')).getTime()
    : true;
  const isBeforeEndDate = endDate
    ? currentDate <= new Date(endDate.replaceAll('/', '-')).getTime()
    : true;
  return isAfterStartDate && isBeforeEndDate;
}

function controlShowDialog() {
  return props.info?.startDate || props.info?.endDate
    ? isDuringDateRange(props.info?.startDate, props.info?.endDate)
    : true;
}

const showDialog = ref(controlShowDialog());

function getDialogTitle() {
  switch (props.info.type) {
    case 'mainstory':
      return `${getI18nString(userLanguage.value, 'updates.updated', {
        title: props.info.title,
      })}`;
    case 'student':
      return `${getI18nString(
        userLanguage.value,
        'updates.favorScheduleUpdated',
        {
          name: props.info.title,
        }
      )}`;
    case 'minigame':
      return `${getI18nString(userLanguage.value, 'updates.minigameUpdated', {
        name: props.info.title,
        date: props.info.endDate || '',
      })}`;
    default:
      return `${getI18nString(userLanguage.value, 'updates.updated', {
        title: props.info.title,
      })}`;
  }
}
/* eslint-disable @typescript-eslint/no-non-null-assertion */
function handleJumpToRequest() {
  switch (props.info.type) {
    case 'mainstory':
      router.push({
        name: 'MainStory',
      });
      break;
    case 'student':
      router.push(`/archive/${props.info.jumpTo}/momotalk`);
      break;
    case 'minigame':
      router.push(
        'string' === typeof props.info.jumpTo
          ? props.info.jumpTo
          : props.info.jumpTo!.toString()
      );
      break;
    default:
      break;
  }
}
/* eslint-enable @typescript-eslint/no-non-null-assertion */
</script>

<template>
  <neu-dialog
    v-if="showDialog"
    :title="getDialogTitle()"
    smaller-title
    show-mask="false"
    shadow
    :positive-text="getI18nString(userLanguage, 'actions.goto')"
    :negative-text="getI18nString(userLanguage, 'actions.close')"
    @negativeClick="showDialog = false"
    @positiveClick="handleJumpToRequest"
  >
    <template #title-before>
      <img src="/src/assets/info.svg" alt="info" />
    </template>
  </neu-dialog>
</template>

<style scoped lang="scss"></style>
