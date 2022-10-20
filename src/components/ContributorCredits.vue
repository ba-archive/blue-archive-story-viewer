<template>
  <div id="contributor-container" class="flex-vertical">
    <h2>成为贡献者</h2>
    <p>
      这个项目目前是由我一个人在写，进度可能会很慢（特别最近研究生导师催着我接下来两个月要出成果😭）
    </p>
    <p>如果你：</p>
    <ul>
      <li>愿意提供没有覆盖到的学生外号，或者</li>
      <li>
        <strong>愿意提供和学生的 momotalk 的日服对话截图（这个很重要！）</strong
        >，或者
      </li>
      <li>有 BA 的解包经验（播放器需要包里的美术资源），或者</li>
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
      <p>欢迎在 NGA 当中留言！（链接我发完贴之后更新上来）</p>

      <h2>同时感谢以下朋友的贡献：（排名不分先后）</h2>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
#contributor-container {
  align-items: flex-start;
  align-self: center;
  width: 30rem;
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

a {
  color: var(--color-text-main);
}
</style>
