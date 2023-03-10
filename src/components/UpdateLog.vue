<script setup lang="ts">
import { h } from 'vue';
import { UpdateLog } from '../types/UpdateNews';

const updateLogs: UpdateLog[] = [
  {
    date: '2023-03-11',
    contents: [
      {
        type: 'test',
        content: '4K 超分辨率支持',
      },
    ],
  },
  {
    date: '2023-03-09',
    contents: [
      {
        type: 'student',
        students: [{ name: '黑崎 小雪', id: 10063 }],
      },
    ],
  },
  {
    date: '2023-03-06',
    contents: [
      {
        type: 'test',
        content: '序章和体香好感剧情 1 播放',
      },
    ],
  },
  {
    date: '2023-02-22',
    contents: [
      {
        type: 'feat',
        content: '完善时的弹性装甲过滤逻辑',
      },
      {
        type: 'student',
        students: [
          { name: '飞鸟马 时', id: 10062 },
          { name: '桐藤 渚', id: 20024 },
        ],
      },
    ],
  },
];

const contributors = [
  {
    name: '黑猫汐',
    role: '校对',
    avatar: '/image/contributor/amahashio.webp',
    link: 'https://github.com/AmahaShio',
  },
  {
    name: '小陈菌',
    role: '自动化',
    avatar: '/image/contributor/ciisaichan.webp',
    link: 'https://github.com/ciisaichan',
  },
  {
    name: 'Coya',
    role: 'UI',
    avatar: '/image/contributor/coya.webp',
  },
  {
    name: '第一个mt',
    role: '前端',
    avatar: '/image/contributor/diyigemt.webp',
    link: 'https://github.com/diyigemt',
  },
  {
    name: '发椿',
    role: '翻译',
    avatar: '/image/contributor/fachun.webp',
  },
  {
    name: '飞龙project',
    role: '自动化',
    avatar: '/image/contributor/feilongproject.webp',
    link: 'https://github.com/feilongproject',
  },
  {
    name: 'Icarus',
    role: '运维',
    avatar: '/image/contributor/icarus.webp',
  },
  {
    name: '海星xd',
    role: '前端',
    avatar: '/image/contributor/kaiseixd.webp',
    link: 'https://github.com/kaiseixd',
  },
  {
    name: '吉光',
    role: '前端',
    avatar: '/image/contributor/luckyray-fan.webp',
    link: 'https://github.com/luckyray-fan',
  },
  {
    name: 'Mark Chen',
    role: '前端',
    avatar: '/image/contributor/mark9804.webp',
    link: 'https://github.com/Mark9804',
  },
  {
    name: '茗门',
    role: '后端',
    avatar: '/image/contributor/mingmen.webp',
  },
  {
    name: 'Misaka18655',
    role: '翻译',
    avatar: '/image/contributor/misaka18655.webp',
  },
  {
    name: 'Z_DK',
    role: '前端',
    avatar: '/image/contributor/nencao.webp',
    link: 'https://github.com/NENCAO',
  },
  {
    name: 'Notype',
    role: '前端/自动化',
    avatar: '/image/contributor/notnotype.webp',
    link: 'https://github.com/notnotype',
  },
  {
    name: '偶然幻想',
    role: '前端',
    avatar: '/image/contributor/ourandream.webp',
    link: 'https://github.com/ourandream',
  },
  {
    name: 'HeartUnderBlade',
    role: '自动化',
    avatar: '/image/contributor/pfjhyyj.webp',
    link: 'https://github.com/pfjhyyj',
  },
  {
    name: 'scn',
    role: '翻译',
    avatar: '/image/contributor/scn.webp',
  },
  {
    name: 'Setsuna',
    role: '前端',
    avatar: '/image/contributor/shinonomesetsuna.webp',
    link: 'https://github.com/ShinonomeSetsuna',
  },
  {
    name: '星空若曦',
    role: '校对',
    avatar: '/image/contributor/xingkongruoxi.webp',
  },
  {
    name: 'Tiramisu',
    role: '翻译（繁中）',
    avatar: '/image/contributor/tiramisu.webp',
  },
];

// make vue-tsc happy
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const contributorList: any = h(
  'div',
  {
    id: 'update-log-contributor-wall',
  },
  contributors
    .sort((a, b) =>
      a.name.localeCompare(b.name, 'zh-Hans-CN', { sensitivity: 'accent' })
    )
    .map(contributor => {
      return h(
        contributor.link ? 'a' : 'div',
        {
          href: contributor.link,
          class: 'contributor__avatar',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        [
          h('img', {
            src: contributor.avatar,
            alt: contributor.name,
            title: `${contributor.name} - ${contributor.role}`,
          }),
        ]
      );
    })
);
</script>

<template>
  <div id="contributor-container" class="flex-vertical">
    <h2 class="update-log__title">更新日志</h2>
    <!-- eslint-disable vue/require-v-for-key -->
    <div class="update-log__block" v-for="log in updateLogs">
      <h3>{{ log.date }}</h3>
      <ul>
        <li v-for="content in log.contents">
          <span v-if="'student' !== content.type">
            <span class="update-type">{{ content.type }}: </span>
            <span class="update-content">{{ content.content }}</span>
          </span>
          <span v-else>
            <span class="update-type">student: </span>
            <span class="update-content"
              >添加
              <span class="momotalk-link" v-for="student in content.students">
                <router-link :to="`/archive/${student.id}/momotalk`">{{
                  student.name
                }}</router-link>
              </span>
              的个人剧情
            </span>
          </span>
        </li>
      </ul>
    </div>
    <!--eslint-enable vue/require-v-for-key-->

    <h3>贡献者：（以名称排序）</h3>
    <contributor-list />
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
}

.update-log__title {
  margin-bottom: 2rem;
}

.update-log__block {
  ul {
    margin-bottom: 1rem;
    padding-left: 1rem;
  }

  .update-content {
    a {
      transition: color 0.375s ease-in-out;
      color: var(--color-text-main);
      text-decoration: underline;
    }
    .momotalk-link:not(:last-child)::after {
      content: '、';
    }
  }
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

@media screen and (max-width: 768px) {
  #contributor-container {
    justify-content: flex-start;
  }

  .roadmap {
    max-width: 90%;
  }
}
</style>

<style lang="scss">
#update-log-contributor-wall {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  .contributor__avatar {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
    }
  }
}
</style>
