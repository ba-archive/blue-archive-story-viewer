<template>
  <div class="flex-vertical">
    <article>
      <h2>友情链接</h2>
      <div class="contribution-wall">
        <a
          href="https://space.bilibili.com/37507923"
          target="_blank"
          class="contribution-brick rounded-small shadow-near"
        >
          <img class="avatar" src="/image/contributor/zixunzhan.jpg" />
          <h4>碧蓝档案资讯站</h4>
          <p>为玩家服务的民间组织，尊重官方设定</p>
        </a>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
// 这行注释别删，删了 prettier 会报错
</script>

<style scoped lang="scss">
article {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: min(50rem, 90%);
}

.contribution-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  margin-top: 1rem;
}

.contribution-brick {
  grid-column-gap: 1rem;
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-areas:
    'avatar title'
    '. description';
  align-items: center;
  transition: all 0.375s ease-in-out;
  background-color: var(--color-card-background);
  padding: 1rem;
  max-width: 16rem;
  color: var(--color-text-main);
  text-decoration: none;

  &:hover {
    box-shadow: var(--style-shadow-farther);
  }

  .avatar {
    grid-area: avatar;
    border-radius: 50%;
    width: 2.5rem;
  }

  h4 {
    grid-area: title;
  }

  p {
    grid-area: description;
    color: #bababa;
    font-size: 0.9rem;
  }
}

h2 {
  margin: 1rem auto 0.5rem;
}

@media screen and (max-width: 768px) {
  article {
    width: fit-content;
  }

  .contribution-brick {
    width: calc(100vw - 2rem);
    max-width: unset;
  }
}
</style>
