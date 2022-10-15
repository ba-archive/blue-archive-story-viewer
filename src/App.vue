<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showMainMenu = ref(true);

watch(
  () => route.path,
  (newRoute) => {
    showMainMenu.value = newRoute === "/";
  }
);

onMounted(() => {
  const deviceWidth = window.innerWidth;
  if (deviceWidth < 768) {
    alert("该网站暂未适配移动端，为了更好的体验，请使用电脑访问。");
  }
});
</script>

<template>
  <transition name="fade">
    <div id="main-menu-container" v-if="showMainMenu">
      <router-link class="menu-link acrylic" id="story-link" to="/mainStory">
        <div class="cover-image-container">
          <img src="/image/menu/sanctum_tower.webp" alt="Sanctum tower" />
        </div>
        <h1>主线剧情</h1></router-link
      >
      <router-link
        class="menu-link acrylic"
        id="mini-story-link"
        to="/miniStory"
        ><div class="cover-image-container">
          <img src="/image/menu/shiroko.webp" alt="Shiroko" />
        </div>
        <h1>Mini Story</h1></router-link
      >
      <router-link
        class="menu-link acrylic"
        id="group-story-link"
        to="/groupStory"
      >
        <div class="cover-image-container">
          <img
            src="/image/menu/afterclass_sweets.webp"
            alt="After class sweets"
          />
        </div>
        <h1>社团剧情</h1></router-link
      >
      <router-link class="menu-link acrylic" id="archive-link" to="/archive">
        <div class="cover-image-container">
          <img src="/image/menu/gehenna.webp" alt="I dont know" />
        </div>
        <h1>学生个人剧情</h1></router-link
      >
    </div>
  </transition>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
#main-menu-container {
  grid-gap: 2rem;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "mainstory ministory groupstory"
    "mainstory ministory groupstory"
    "mainstory archive archive";
  transform: skew(-10deg);
  width: 60vw;
  height: 60vh;
}

.menu-link {
  display: grid;
  grid-template-rows: auto max-content;
  grid-template-areas:
    "photo"
    "title";
  place-items: center;
  transition: all 0.375s ease-in-out;
  box-shadow: 0.2rem 0.2rem 1rem hsla(0deg, 0%, 0%, 0.2);
  border-radius: 0.5rem;
  background-color: #c2c7d21a;
  width: 100%;
  height: 100%;
  color: var(--color-text-dark, #fff);
  text-decoration: none;
  text-shadow: 0 0 1rem hsla(0deg, 0%, 100%, 0.5);

  h1 {
    grid-area: title;
    transform: skew(10deg);
    padding: 1rem 0;
  }

  .cover-image-container {
    display: flex;
    position: relative;
    grid-area: photo;
    justify-content: center;
    align-items: center;
    transform: skew(9deg) rotate(5deg);
    width: min-content;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      transform: skew(1deg) rotate(-3deg);
      z-index: -1;
      background-color: #ffffffb5;
      width: 100%;
      height: 100%;
      content: "";
    }
  }

  img {
    box-shadow: 0.25rem 0.25rem 1rem hsla(0deg, 0%, 0%, 0.25);
    border: solid 0.4rem var(--color-text-light, #fff);
    width: clamp(150px, calc(20vw - 8rem), 220px);
  }

  &:hover {
    scale: 1.01;
    box-shadow: 0.5rem 0.5rem 1rem hsla(0, 0%, 0%, 0.2);
    background-color: hsla(0, 0%, 100%, 0.3);
    text-shadow: 0 0 1rem hsla(0, 0%, 100%, 0.8);
  }
}

#archive-link {
  grid-template-rows: 1fr;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas: "photo title";
  grid-area: archive;

  .cover-image-container {
    margin-top: unset;
  }

  img {
  }
}

#story-link {
  grid-area: mainstory;
}

#mini-story-link {
  grid-area: ministory;
}

#group-story-link {
  grid-area: groupstory;
}

:is(#group-story-link, #mini-story-link) img {
  max-width: 200px;
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: opacity 0.375s;
  width: 100vw;
  height: var(--main-height, 93vh);
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>
