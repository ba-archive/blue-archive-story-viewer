<script setup></script>

<template>
  <div class="fill-width flex-vertical rounded-small">
    <div class="student-home-nav-bar">
      <router-link :to="{ name: 'momotalk' }" class="button" role="button"
        >momotalk</router-link
      >
      <router-link :to="{ name: 'studentStory' }" class="button" role="button"
        >Story</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
