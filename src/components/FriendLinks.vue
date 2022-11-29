<template>
  <div class="flex-vertical">
    <article>
      <h2>友情链接</h2>
      <p>这个项目能够成功上线，离不开以下朋友的帮助。</p>
      <div class="contribution-wall">
        <a
          href="https://space.bilibili.com/37507923"
          target="_blank"
          class="contribution-brick rounded-small shadow-near"
        >
          <img class="avatar" src="/image/contributor/zixunzhan.jpg" />
          <p>碧蓝档案资讯站</p>
        </a>
      </div>
      <h3></h3>
    </article>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped lang="scss">
article {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 30rem;
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
  background-color: var(--color-card-background);
  padding: 1rem;
  width: 100%;
  height: 100%;
  color: var(--color-text-main);
  font-weight: bold;
  text-align: center;
  text-decoration: none;
}

.avatar {
  margin-bottom: 1rem;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
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
