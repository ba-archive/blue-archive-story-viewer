<script setup lang="ts">
import { PropType, Ref, ref } from 'vue';
import { Section } from '../../types/StoryJson';
import NeuTitleBar from '../widgets/NeuUI/NeuTitleBar.vue';
import StoryBriefBlock from './StoryBriefBlock.vue';

defineProps({
  title: { type: String, required: true },
  avatar: { type: String, required: false, default: '' },
  index: { type: [String, Number], required: false },
  sections: { type: Array as PropType<Section[]>, required: true },
});

const openChapters: Ref<number[]> = ref([0]);
function handleOpenChapters(index: number) {
  if (openChapters.value.includes(index)) {
    openChapters.value = openChapters.value.filter(i => i !== index);
  } else {
    openChapters.value.push(index);
  }
}
</script>

<template>
  <div class="story-line-container">
    <neu-title-bar
      :title="title"
      :avatar="avatar"
      :index="index"
      :is-active="openChapters.includes(0)"
      @clicked="handleOpenChapters(0)"
    />
    <router-link
      v-for="section in sections"
      :to="`/mainStory/${section.story_id}`"
      v-show="openChapters.includes(0)"
      :key="section.story_id"
    >
      <story-brief-block
        :title="section.title"
        :avatar="avatar"
        :description="section.description"
      />
    </router-link>
  </div>
  <router-view></router-view>
</template>

<style scoped lang="scss">
.story-line-container {
  display: grid;
  grid-auto-flow: row;
  gap: 1rem;
  width: 30rem;
}

a {
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  .story-line-container {
    width: calc(100vw - 2rem);
  }
}
</style>
