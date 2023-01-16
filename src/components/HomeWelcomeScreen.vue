<template>
  <div id="home-welcome" class="center flex-vertical fill-screen">
    <img class="mika-sticker" src="/src/assets/mika_sticker.webp" alt="mika" />
    <p>先从<span id="choice"></span>选择项目哦</p>
    <p>(现在只做了学生个人剧情)</p>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped lang="scss">
#home-welcome {
  img {
    transform: scaleX(-1);
    max-width: 200px;
  }

  p {
    transition: color 0.375s ease-in-out;
    color: var(--color-text-main);
    font-weight: bold;
    font-size: 1.5rem;
  }
}

#choice::after {
  content: '左边';
}

@media screen and (max-width: 768px) {
  #choice::after {
    content: '右上角';
  }
}
</style>
