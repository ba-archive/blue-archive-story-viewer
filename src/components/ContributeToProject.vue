<script setup lang="ts">
const contributors = [
  { name: 'Shinku_cc', role: '前端' },
  { name: 'ourandream', role: '前端' },
  { name: '海星', role: '前端' },
  { name: '灼光之心', role: '前端' },
  { name: 'Z_DK', role: '前端' },
  { name: 'Notype', role: '自动化' },
  { name: '第一个mt', role: '全栈' },
  { name: '骑猪追月', role: '后端' },
  { name: 'EllisNewman', role: '解包，美术' },
  { name: 'setsuna', role: '前端' },
  { name: 'Coya', role: 'UI' },
  { name: 'HeartunderBlade', role: '前端，自动化，架构，运维' },
  { name: '逝徊', role: '运维' },
  { name: '小陈菌', role: '自动化' },
  { name: '柳', role: '翻译' },
  { name: 'Misaka18655', role: '翻译' },
];
</script>

<template>
  <div id="contributor-container" class="flex-vertical">
    <h2>成为贡献者</h2>
    <p>如果你对这个项目感兴趣，欢迎成为贡献者！</p>
    <p>我们的路线图：</p>
    <img
      class="roadmap rounded-medium"
      src="/src/assets/roadmap.webp"
      alt="路线图"
    />
    <p>我们需要：</p>
    <ul>
      <li>
        <mark>前端</mark>：基于 Vue3 + pinia + TypeScript +
        <a href="https://github.com/pixijs/pixijs" target="_blank">PixiJS</a>
        开发
        <a href="https://github.com/ba-archive/ba-story-player" target="_blank"
          >剧情播放器</a
        >
        和后续的剧情编辑器；
      </li>
      <li><mark>架构</mark>：设计前后端数据交换规范；</li>
      <li>
        <mark>后端</mark>：基于 Go 或 Java 开发检索后端；（目前倾向于 Go）
      </li>
      <li>
        <mark>服务器运维</mark>：维护我们的小破 Ubuntu
        服务器，合理配置服务器系统防火墙和 openresty 服务；
      </li>
      <li>
        <mark>自动化（Ops）</mark>：帮助团队建立从
        <a href="https://github.com/ba-archive/weaverbird" target="_blank"
          >资源更新</a
        >
        到部署的自动化 CI/CD 管线；
      </li>
      <li><mark>美术</mark>：整体视觉设计和 UI 交互；</li>
      <li><mark>LOGO</mark>：比现在的好看就行；以及</li>
      <li>
        <!--eslint-disable max-len-->
        <mark>正在查看内容的你</mark>：<a
          href="https://github.com/ba-archive/blue-archive-story-viewer/issues/new?assignees=&labels=bug%2Cquestion&template=bug_report.yml&title=%5BBug%5D+"
          target="_blank"
          >汇报 bug</a
        >，<a
          href="https://github.com/ba-archive/blue-archive-story-viewer/issues/new?assignees=&labels=enhancement&template=feature_request.yml&title=%5BEnhancement%5D+"
          target="_blank"
          >提出意见或建议</a
        >
        <!--eslint-enable max-len-->
      </li>
      <li>
        <a
          href="https://github.com/ba-archive/blue-archive-story-viewer/discussions/97"
          target="_blank"
          >更多信息请点此查看详情</a
        >
      </li>
    </ul>
    <p>
      欢迎联系！
      <a
        href="https://message.bilibili.com/#/whisper/mid14066311"
        target="_blank"
        >（B站私信点这里）</a
      >，
      <a href="mailto:mail@blue-archive.io" target="_blank"
        >（邮件联系点这里）</a
      >
    </p>

    <h2>同时感谢以下贡献者：（排名不分先后）</h2>
    <!-- eslint-disable vue/require-v-for-key -->
    <p v-for="contributor in contributors" v-once>
      {{ contributor.name }}：{{ contributor.role }}
    </p>
    <!--eslint-enable vue/require-v-for-key-->
    <p>以及每一个热爱碧蓝档案的玩家</p>
  </div>
</template>

<style scoped lang="scss">
#contributor-container {
  align-items: flex-start;
  align-self: center;
  transition: color 0.375s ease-in-out;
  padding-bottom: 2rem;
  width: min(50rem, 90%);
  color: var(--color-text-main);

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
    transition: color 0.375s ease-in-out;
    color: var(--color-text-main);
  }

  .roadmap {
    margin: 1rem 0;
    max-width: min(50rem, 90%);
  }

  mark {
    transition: color 0.375s ease-in-out;
    background-color: transparent;
    color: var(--color-text-main);
    font-weight: bold;
    text-decoration-line: underline;
    text-decoration-color: cornflowerblue;
    text-decoration-thickness: 0.2rem;
    text-underline-offset: 0.2rem;
  }
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
