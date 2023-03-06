<script setup lang="ts">
export interface StudentObject {
  name: string;
  id: number;
}

export interface UpdateContent {
  type: 'fix' | 'feat' | 'refact' | 'docs' | 'chore' | 'test' | 'student';
  content?: string;
  students?: StudentObject[];
}

export interface UpdateLog {
  date: string;
  contents: UpdateContent[];
}

const updateLogs: UpdateLog[] = [
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

    <h3>贡献者：（排名不分先后）</h3>
    <!-- eslint-disable vue/require-v-for-key -->
    <p v-for="contributor in contributors" v-once>
      <mark>{{ contributor.name }}</mark
      >：{{ contributor.role }}
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
