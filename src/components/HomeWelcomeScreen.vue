<template>
  <div id="home-welcome" class="center flex-vertical fill-screen">
    <div class="center flex-vertical">
      <img
        class="mika-sticker"
        src="/src/assets/mika_sticker.webp"
        alt="mika"
      />
      <p>先从<span id="choice"></span>选择项目哦</p>
      <p v-if="!showKoharu">
        (<router-link class="navigation" to="/archive/10065/momotalk"
          >果穗
        </router-link>
        、<router-link class="navigation" to="/archive/10020/momotalk"
          >小春
        </router-link>
        、
        <router-link class="navigation" to="/archive/10064/momotalk"
          >佳代子（正月）</router-link
        >剧情已开放)
      </p>
    </div>
    <div v-if="showKoharu" class="fill-width">
      <div class="card-minigame-entrance">
        <neu-dialog
          title="小春在这个月过生日！"
          show-mask="false"
          shadow
          positive-text="前往小游戏"
          negative-text="关闭"
          @positiveClick="handleGoToKoharuMiniGame"
          @negativeClick="showKoharu = false"
        >
          <template #content>
            <span>我们为小春准备了一个小游戏，来试试吧！</span>
            <span class="briefing"
              >小游戏将在新标签页中打开，刷新页面此提示会再次出现</span
            >
          </template>
        </neu-dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NeuDialog from './widgets/NeuUI/NeuDialog.vue';

const showKoharu = ref(false);

const month = new Date().getMonth() + 1;

if (month === 4) {
  showKoharu.value = true;
}

function handleGoToKoharuMiniGame() {
  window.open('https://koharu.blue-archive.io/', '_blank');
  showKoharu.value = false;
}
</script>

<style scoped lang="scss">
#home-welcome {
  gap: 1rem;
  user-select: none;

  .mika-sticker {
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
  color: var(--color-pallete-arona-blue);
  text-decoration: none;
}

.briefing {
  display: block;
  margin-top: 0.5rem;
  color: #808080;
  font-size: 0.8rem;
}

@media screen and (max-width: 768px) {
  #choice::after {
    content: '右上角';
  }
}
</style>
