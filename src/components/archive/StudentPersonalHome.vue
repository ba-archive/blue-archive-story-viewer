<template>
  <div class="fill-width flex-vertical rounded-small">
    <div class="student-home-nav-bar">
      <router-link :to="{ name: 'Momotalk' }" class="button" role="button"
        >momotalk</router-link
      >
      <router-link :to="{ name: 'StudentStory' }" class="button" role="button"
        >好感剧情</router-link
      >
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive include="MomotalkContainer" :max="1">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
// 这行注释别删，删了 prettier 会报错
</script>

<style scoped lang="scss">
.student-home-nav-bar {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  place-items: center;

  .button {
    padding: 1rem 1.5rem;
  }
}
</style>
