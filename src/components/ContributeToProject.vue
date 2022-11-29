<template>
  <div id="contributor-container" class="flex-vertical">
    <h2>成为贡献者</h2>
    <p>如果你对这个项目感兴趣，欢迎成为贡献者！</p>
    <p>我们的路线图：</p>
    <a href="/src/assets/roadmap.webp">
      <img class="roadmap" src="/src/assets/roadmap.webp" />
    </a>
    <br />
    <p>如果你：</p>
    <ul>
      <li><strong>有项目管理经验（团队有 20 个人了）</strong>，或者</li>
      <li>
        <strong>
          熟悉 Vue3 + pinia + TypeScript 的开发模式, 愿意加入
          <a
            href="https://github.com/ba-archive/blue-archive-story-viewer"
            target="_blank"
            >项目建设</a
          >，或者
        </strong>
      </li>
      <li><strong>有基于 Go / Java 的后端开发经验</strong>，或者</li>
      <li><strong>有服务器运维经验</strong>，或者</li>
      <li><strong>有 DevOps 经验，能够建立 CI/CD 管线</strong>，或者</li>
      <li><strong>有前后端架构设计经验（想试试手也可以）</strong>，或者</li>
      <li><strong>有 UI 设计经验</strong>，或者</li>
      <li><strong>想汇报 bug，意见或建议</strong>，</li>

      <p>
        欢迎联系我！
        <a
          href="https://message.bilibili.com/#/whisper/mid14066311"
          target="_blank"
          >（电脑用户点这里）</a
        >，
        <a href="https://space.bilibili.com/14066311" target="_blank"
          >（手机用户点这里）</a
        >，
        <a href="mailto:mail@blue-archive.io" target="_blank"
          >（邮箱地址点这里）</a
        >
      </p>

      <h2>同时感谢以下朋友的贡献：（排名不分先后）</h2>
      <p>
        <a href="https://nga.178.com/nuke.php?func=ucp&uid=60668025"
          >Shinku_cc</a
        >
        前端
      </p>
      <p>
        <a href="https://nga.178.com/nuke.php?func=ucp&uid=64394869"
          >ourandream</a
        >
        前端
      </p>
      <p>_Aisle 前端</p>
      <p>
        <a href="https://nga.178.com/nuke.php?func=ucp&uid=60919291"
          >EllisNewman</a
        >
        解包，美术
      </p>
      <p>
        <a href="https://nga.178.com/nuke.php?func=ucp&uid=63222501">陆合正</a>
        momotalk 资源提供
      </p>
      <p>
        <a href="https://nga.178.com/nuke.php?func=ucp&uid=1761181">骑猪追月</a>
        后端
      </p>
      <p>
        <a href="https://nga.178.com/nuke.php?func=ucp&uid=42164110"
          >第一个mt</a
        >
        全栈
      </p>
    </ul>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped lang="scss">
#contributor-container {
  align-items: center;
  align-self: center;
  width: 100%;
}

h2 {
  align-self: center;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

p,
li {
  margin-top: 1rem;
}

li {
  list-style: none;

  &::before {
    margin-right: 0.5rem;
    content: '•';
  }
}

a {
  color: var(--color-text-main);
}

.roadmap {
  max-width: 50rem;
}

@media screen and (max-width: 768px) {
  #contributor-container {
    justify-content: flex-start;
  }

  .roadmap {
    max-width: 90vw;
  }
}
</style>
