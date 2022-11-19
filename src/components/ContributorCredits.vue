<template>
  <div id="contributor-container" class="flex-vertical">
    <h2>成为贡献者</h2>
    <p>如果你对这个项目感兴趣，欢迎成为贡献者！</p>
    <p>如果你：</p>
    <ul>
      <li><strong>有项目管理经验（团队有 13 个人了）</strong>，或者</li>
      <li><strong>愿意参与翻译</strong>，或者</li>
      <li>愿意提供没有覆盖到的学生外号，或者</li>
      <li>有 BA 的解包经验（或者能够逆向 so 文件），或者</li>
      <li>愿意提供和学生的 momotalk 的日服对话截图，或者</li>
      <li>
        了解 Vue / React, 愿意加入
        <a
          href="https://github.com/ba-archive/blue-archive-story-viewer"
          target="_blank"
          >项目建设</a
        >
      </li>
      <li>
        <strong
          >了解
          <a href="https://github.com/pixijs/spine" target="_blank"
            >pixi-spine</a
          >
          或者其他 web 上的 Spine
          动画库（这个也很重要，不然只能播片了……），</strong
        >
      </li>
      <p>
        欢迎在
        <a href="https://nga.178.com/read.php?tid=33938856" target="_blank"
          >NGA 帖子</a
        >
        当中留言联系我！
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

@media screen and (max-width: 768px) {
  #contributor-container {
    justify-content: flex-start;
  }
}
</style>
