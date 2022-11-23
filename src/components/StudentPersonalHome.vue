<template>
  <div class="fill-width flex-vertical rounded-small">
    <div class="student-home-nav-bar">
      <router-link :to="{ name: 'momotalk' }" class="button" role="button"
        >momotalk</router-link
      >
      <router-link :to="{ name: 'studentStory' }" class="button" role="button"
        >好感剧情</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
//
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
