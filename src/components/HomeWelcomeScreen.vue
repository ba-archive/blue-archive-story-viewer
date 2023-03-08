<template>
  <div id="home-welcome" class="center flex-vertical fill-screen">
    <img class="mika-sticker" src="/src/assets/mika_sticker.webp" alt="mika" />
    <p>先从<span id="choice"></span>选择项目哦</p>
    <p>
      (<router-link class="navigation" to="/archive/10063/momotalk"
        >小雪</router-link
      >、
      <router-link class="navigation" to="/archive/10053/story"
        >体香1</router-link
      >和<router-link to="/mainStory" class="navigation">序章</router-link
      >剧情已开放)
    </p>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped lang="scss">
#home-welcome {
  user-select: none;

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

.navigation {
  color: var(--color-primary-button);
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  #choice::after {
    content: '右上角';
  }
}
</style>
