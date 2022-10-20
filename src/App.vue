<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import LanguageSwitcher from "./components/LanguageSelector.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

const route = useRoute();
const isMainPage = ref(true);

watch(
  () => route.path,
  (newRoute) => {
    isMainPage.value = newRoute === "/";
  }
);

onMounted(() => {
  const deviceWidth = window.innerWidth;
  if (deviceWidth < 768) {
    alert("该网站暂未适配移动端，为了更好的体验，请使用电脑访问。");
  }
});

const getMainPageClass = computed(() =>
  route.path === "/" ? "main-page" : ""
);
</script>

<template>
  <div id="side-menu-panel">
    <div id="id-sensei">
      <img src="/src/assets/arona_icon.webp" alt="Arona" />
      <div id="welcome-message">
        <p>欢迎，</p>
        <p contenteditable="true">Sensei</p>
      </div>
    </div>
    <div id="navigation">
      <router-link class="nav-link level-1 link-home" to="/">Home</router-link>
      <router-link class="nav-link level-1" to="/mainStory"
        >主线剧情</router-link
      >
      <router-link class="nav-link level-1" to="/miniStory"
        >Mini Story</router-link
      >
      <router-link class="nav-link level-1" to="/groupStory"
        >社团剧情</router-link
      >
      <router-link class="nav-link level-1" to="/archive"
        >学生个人剧情</router-link
      >
    </div>

    <div id="settings">
      <language-switcher />
      <theme-switcher />
    </div>
  </div>
  <div id="main-view" :class="getMainPageClass">
    <div
      id="home-welcome"
      v-if="isMainPage"
      class="center flex-vertical fill-screen"
    >
      <img class="mika-sticker" src="/src/assets/mika_sticker.webp" />
      <p>先从左边选择项目哦</p>
      <p>(现在只做了学生个人剧情)</p>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
#side-menu-panel {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: stretch;
  padding: 2rem 0;
}

#id-sensei {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  margin-left: 1rem;

  img {
    backdrop-filter: brightness(0.8) saturate(0.8);
    outline: 0.15rem var(--color-glass-panel-border-darker) solid;
    outline-offset: 0.15rem;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }

  #welcome-message {
    margin-left: 1rem;
    font-weight: bold;
    font-size: 1rem;
  }
}

#navigation {
  display: flex;
  flex-direction: column;
}

.nav-link {
  display: flex;
  border-radius: 0.5rem;
  padding: 0.25rem 1rem;
  color: var(--color-text-dark);
  text-decoration: none;

  &.router-link-active:not(.link-home),
  &.router-link-exact-active {
    font-weight: bolder;
  }

  &:hover {
    background: var(--color-glass-panel-hover);
  }
}

#settings {
  grid-gap: 1rem;
  display: grid;
  grid-auto-flow: column;
  margin-top: auto;
  margin-left: 1rem;
}

#main-view {
  display: flex;
  grid-area: main;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  border-radius: 2rem;
  background-color: var(--color-background);
  overflow-y: scroll;

  &.main-page {
    background-color: transparent;
  }
}

#home-welcome {
  img {
    transform: scaleX(-1);
    max-width: 200px;
  }

  p {
    font-weight: bold;
    font-size: 1.5rem;
  }
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
