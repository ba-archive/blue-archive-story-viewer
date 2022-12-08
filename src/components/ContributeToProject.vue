<template>
  <div id="contributor-container" class="flex-vertical">
    <h2>成为贡献者</h2>
    <p>如果你对这个项目感兴趣，欢迎成为贡献者！</p>
    <p>我们的路线图：</p>
    <img class="roadmap" src="/src/assets/roadmap.webp" />
    <br />
    <p>我们需要：</p>
    <ul>
      <li>
        <mark>项目经理</mark>：有项目管理经验（团队有 20
        个人），对前后端技术和架构有一定了解；
      </li>
      <li>
        <mark>前端</mark>：熟悉 Vue3 + pinia + TypeScript 的开发模式, 愿意加入
        <a
          href="https://github.com/ba-archive/blue-archive-story-viewer"
          target="_blank"
          >项目建设</a
        >；
      </li>
      <li><mark>后端</mark>：有基于 Go / Java 的后端开发经验；</li>
      <li>
        <mark>服务器运维</mark>：有 Linux
        服务器运维经验，会合理配置服务器系统防火墙和 openresty 服务；
      </li>
      <li>
        <mark>DevOps</mark>：能够帮助团队建立从资源更新到部署的自动化 CI/CD
        管线；
      </li>
      <li><mark>架构</mark>：有前后端架构设计经验（想试试手也可以）；</li>
      <li><mark>UI</mark>：会使用 Figma 等工具提供原型图等图像资产；</li>
      <li><mark>正在查看内容的你</mark>：汇报 bug，意见或建议</li>

      <p>
        欢迎联系！
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
      <p>以及每一个热爱碧蓝档案的玩家</p>
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
  width: min(50rem, 90%);
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
  max-width: min(50rem, 90%);
}

mark {
  background-color: transparent;
  font-weight: bold;
  text-decoration-line: underline;
  text-decoration-color: cornflowerblue;
  text-decoration-thickness: 0.2rem;
  text-underline-offset: 0.2rem;
}

@media screen and (max-width: 768px) {
  #contributor-container {
    justify-content: flex-start;
  }

  .roadmap {
    max-width: 90%;
  }
}
</style>
