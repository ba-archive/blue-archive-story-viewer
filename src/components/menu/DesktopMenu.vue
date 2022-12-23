<template>
  <div class="desktop-menu-panel">
    <div class="id-sensei">
      <div class="avatar-wrapper center">
        <img src="/src/assets/arona_icon.webp" alt="Arona" />
      </div>
      <div class="welcome-message">
        <p>欢迎，</p>
        <user-name-input />
        <span>老师</span>
      </div>
    </div>
    <div id="navigation">
      <router-link class="nav-link level-1 link-home rounded-small" to="/"
        >Home
      </router-link>
      <router-link class="nav-link level-1 rounded-small" to="/mainStory"
        >主线剧情
      </router-link>
      <router-link class="nav-link level-1 rounded-small" to="/miniStory"
        >Mini Story
      </router-link>
      <router-link class="nav-link level-1 rounded-small" to="/groupStory"
        >社团剧情
      </router-link>
      <router-link class="nav-link level-1 rounded-small" to="/archive"
        >学生个人剧情
      </router-link>
      <router-link class="nav-link level-1 rounded-small" to="/friendlinks"
        >友情链接
      </router-link>
      <router-link class="nav-link level-1 rounded-small" to="/contribute"
        >成为贡献者
      </router-link>
    </div>

    <div id="settings">
      <language-selector />
      <theme-switcher />
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSelector from '../widgets/LanguageSelector.vue';
import ThemeSwitcher from '../widgets/ThemeSwitcher.vue';
import UserNameInput from '../widgets/UserNameInput.vue';
</script>

<style scoped lang="scss">
.desktop-menu-panel {
  display: flex;
  grid-area: navigation-pane;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: stretch;
  padding: 2rem 0;
}

.id-sensei {
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

  .welcome-message {
    margin-left: 1rem;
    color: var(--color-text-main);
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
</style>
