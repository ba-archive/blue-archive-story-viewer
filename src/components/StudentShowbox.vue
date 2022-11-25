<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useSettingsStore } from '../store/settings';
import { Student } from '../types/Student';

const props = defineProps({
  studentInfo: Object as PropType<Student>,
});

const settingsStore = useSettingsStore();
const selectedLang = computed(() => settingsStore.getLang.replace('cn', 'zh'));

const studentName = computed(() => {
  return (
    (props.studentInfo?.name[selectedLang.value as keyof Student['name']] as
      | string
      | undefined) || ''
  );
});

function getImagePath(id: number | undefined): string {
  return `/image/avatar_students/${id}.webp`;
}
</script>

<template>
  <div class="student-container rounded-small">
    <img
      class="student-avatar"
      :src="getImagePath(studentInfo?.id)"
      :alt="studentInfo?.name.zh"
    />
    <div class="name-tag">{{ studentName }}</div>
  </div>
</template>

<style scoped lang="scss">
.student-container {
  display: grid;
  position: relative;
  grid-template-areas: 'avatar';
  place-items: center;
  overflow: hidden;

  &.unavailable {
    cursor: not-allowed;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      background-color: hsla(0deg, 0%, 0%, 0.3);
      width: 100%;
      height: 100%;
      content: '';
    }

    &::after {
      position: absolute;
      opacity: 0.8;
      filter: drop-shadow(0 0 1rem #fff);
      width: 25%;
      height: 25%;
      content: url('/src/assets/padlock.svg');
    }
  }
}

.student-avatar {
  grid-area: avatar;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name-tag {
  grid-area: avatar;
  align-self: end;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: var(--color-name-tag);
  padding: 0.2rem 0;
  width: 100%;
  color: var(--color-text-main);
  font-weight: bold;
  text-align: center;
}
</style>
