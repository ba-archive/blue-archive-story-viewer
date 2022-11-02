<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import HomeWelcomeScreen from "./components/HomeWelcomeScreen.vue";
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
      <div class="avatar-wrapper center">
        <img src="/src/assets/arona_icon.webp" alt="Arona" />
      </div>
      <div id="welcome-message">
        <p>欢迎，</p>
        <p contenteditable="true">Sensei</p>
      </div>
    </div>
    <div id="navigation">
      <router-link class="nav-link level-1 link-home rounded-small" to="/"
        >Home</router-link
      >
      <router-link class="nav-link level-1 rounded-small" to="/mainStory"
        >主线剧情</router-link
      >
      <router-link class="nav-link level-1 rounded-small" to="/miniStory"
        >Mini Story</router-link
      >
      <router-link class="nav-link level-1 rounded-small" to="/groupStory"
        >社团剧情</router-link
      >
      <router-link class="nav-link level-1 rounded-small" to="/archive"
        >学生个人剧情</router-link
      >
      <router-link class="nav-link level-1 rounded-small" to="/contributors"
        >成为贡献者</router-link
      >
    </div>

    <div id="settings">
      <language-switcher />
      <theme-switcher />
    </div>
  </div>
  <div id="main-view" class="rounded-large" :class="getMainPageClass">
    <home-welcome-screen :isMainPage="isMainPage" v-if="isMainPage" />
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
  color: var(--color-text-main);

  .avatar-wrapper {
    backdrop-filter: brightness(0.8) saturate(0.8);
    -webkit-backdrop-filter: brightness(0.95) saturate(0.8);
    border: 0.15rem var(--color-player-avatar-border) solid;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    padding: 0.15rem;

    img {
      border-radius: 50%;
      -webkit-border-radius: 50%;
      width: 3rem;
      height: 3rem;
    }
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
  padding: 0.25rem 1rem;
  color: var(--color-text-main);
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
  background-color: var(--color-main-background);
  overflow-y: scroll;

  &.main-page {
    background-color: transparent;
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
