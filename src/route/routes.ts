import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      shouldShowInNav: true,
      navOrder: 0,
      m17n: [
        { lang: 'cn', title: '首页' },
        { lang: 'tw', title: '首頁' },
        { lang: 'jp', title: 'ホーム' },
        { lang: 'en', title: 'Home' },
        { lang: 'kr', title: '홈' },
        { lang: 'th', title: 'หน้าแรก' },
      ],
    },
    children: [
      {
        path: '/archive',
        name: 'StudentSelector',
        meta: {
          shouldShowInNav: true,
          navOrder: 4,
          m17n: [
            { lang: 'cn', title: '学生个人剧情' },
            { lang: 'tw', title: '學生個人劇情' },
            { lang: 'jp', title: '絆ストーリー' },
            { lang: 'en', title: 'Relationship Story' },
            { lang: 'kr', title: '인연 스토리' },
            { lang: 'th', title: 'เนื้อเรื่องสายใย' },
          ],
        },
        component: () => import('../components/archive/StudentSelector.vue'),
        children: [
          {
            path: ':id',
            name: 'StudentPersonalStory',
            meta: {
              shouldShowInNav: false,
            },
            component: () =>
              import('../components/archive/StudentPersonalHome.vue'),
            children: [
              {
                path: 'momotalk',
                name: 'Momotalk',
                meta: {
                  shouldShowInNav: false,
                },
                component: () =>
                  import('../components/momotalk/MomotalkContainer.vue'),
              },
              {
                path: 'story',
                name: 'StudentStory',
                meta: {
                  shouldShowInNav: false,
                },
                component: () =>
                  import('../components/archive/StudentStoryContainer.vue'),
                children: [
                  {
                    path: ':groupId',
                    name: 'StudentStoryViewer',
                    meta: {
                      shouldShowInNav: false,
                    },
                    component: () =>
                      import('../components/archive/StudentStoryPlayer.vue'),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/mainStory',
        name: 'MainStory',
        meta: {
          shouldShowInNav: true,
          navOrder: 1,
          m17n: [
            { lang: 'cn', title: '主线剧情' },
            { lang: 'tw', title: '主線劇情' },
            { lang: 'jp', title: 'メインストーリー' },
            { lang: 'en', title: 'Main Story' },
            { lang: 'kr', title: '메인 스토리' },
            { lang: 'th', title: 'เรื่องหลัก' },
          ],
        },
        component: () => import('../components/MainStoryHome.vue'),
        children: [
          {
            path: ':id',
            name: 'MainStoryDetails',
            meta: {
              shouldShowInNav: false,
            },
            component: () => import('../components/StoryViewer.vue'),
          },
        ],
      },
      {
        path: '/miniStory',
        name: 'MiniStory',
        meta: {
          shouldShowInNav: true,
          navOrder: 2,
          m17n: [
            { lang: 'cn', title: '迷你剧情' },
            { lang: 'tw', title: '迷你劇情' },
            { lang: 'jp', title: 'ミニストーリー' },
            { lang: 'en', title: 'Mini Story' },
            { lang: 'kr', title: '미니 스토리' },
            { lang: 'th', title: 'เรื่องย่อย' },
          ],
        },
        component: () => import('../components/MiniStoryHome.vue'),
      },
      {
        path: '/groupStory',
        name: 'GroupStory',
        meta: {
          shouldShowInNav: true,
          navOrder: 3,
          m17n: [
            { lang: 'cn', title: '社团剧情' },
            { lang: 'tw', title: '社團劇情' },
            { lang: 'jp', title: 'グループストーリー' },
            { lang: 'en', title: 'Sub Story' },
            { lang: 'kr', title: '그룹 스토리' },
            { lang: 'th', title: 'เรื่องกลุ่ม' },
          ],
        },
        component: () => import('../components/GroupStoryHome.vue'),
      },
      {
        path: '/contribute',
        name: 'Contribute',
        meta: {
          shouldShowInNav: true,
          navOrder: 6,
          m17n: [
            { lang: 'cn', title: '成为贡献者' },
            { lang: 'tw', title: '成為貢獻者' },
            { lang: 'jp', title: 'プロジェクトに貢献する' },
            { lang: 'en', title: 'Contribute to our project' },
            { lang: 'kr', title: '프로젝트에 기여하기' },
            { lang: 'th', title: 'มีส่วนร่วมในโครงการ' },
          ],
        },
        component: () => import('../components/ContributeToProject.vue'),
      },
      {
        path: '/friendlinks',
        name: 'FriendLinks',
        meta: {
          shouldShowInNav: true,
          navOrder: 5,
          m17n: [
            { lang: 'cn', title: '友情链接' },
            { lang: 'tw', title: '友情連結' },
            { lang: 'jp', title: 'リンク集' },
            { lang: 'en', title: 'Friend Links' },
            { lang: 'kr', title: '링크 모음' },
            { lang: 'th', title: 'ลิงค์เพื่อน' },
          ],
        },
        component: () => import('../components/FriendLinks.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../components/NotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

const routerConvert = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export { routerConvert, routes };
