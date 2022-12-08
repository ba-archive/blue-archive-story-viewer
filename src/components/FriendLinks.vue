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
      <h3></h3>
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
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  margin-top: 1rem;
}

.contribution-brick {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.375s ease-in-out;
  background-color: var(--color-card-background);
  padding: 1rem;
  color: var(--color-text-main);
  text-align: center;
  text-decoration: none;

  &:hover {
    box-shadow: var(--style-shadow-farther);
  }

  .avatar {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
  }

  p {
    color: #bababa;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 1rem auto 0.5rem;
}

@media screen and (max-width: 768px) {
  article {
    width: 20rem;
  }
}
</style>
