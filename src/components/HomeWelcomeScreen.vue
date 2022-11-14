<template>
  <div id="home-welcome" class="center flex-vertical fill-screen">
    <img class="mika-sticker" src="/src/assets/mika_sticker.webp" />
    <p>先从左边选择项目哦</p>
    <p>(现在只做了学生个人剧情)</p>
  </div>
</template>

<script setup>
//
</script>

<style scoped lang="scss">
#home-welcome {
  img {
    transform: scaleX(-1);
    max-width: 200px;
  }

  p {
    color: var(--color-text-main);
    font-weight: bold;
    font-size: 1.5rem;
  }
}
</style>
