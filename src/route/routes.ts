import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    children: [
      {
        path: 'archive',
        name: 'studentSelector',
        component: () => import('../components/StudentSelector.vue'),
        children: [
          {
            path: ':id',
            name: 'studentPersonalStory',
            component: () => import('../components/StudentPersonalHome.vue'),
            children: [
              {
                path: 'momotalk',
                name: 'momotalk',
                component: () =>
                  import('../components/momotalk/MomotalkContainer.vue'),
              },
              {
                path: 'story',
                name: 'studentStory',
                component: () =>
                  import('../components/StudentStoryContainer.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'mainStory',
        name: '主线剧情',
        component: () => import('../components/MainStoryHome.vue'),
      },
      {
        path: 'miniStory',
        name: '学生小剧情',
        component: () => import('../components/MiniStoryHome.vue'),
      },
      {
        path: 'groupStory',
        name: '社团剧情',
        component: () => import('../components/GroupStoryHome.vue'),
      },
      {
        path: '/contributors',
        name: 'Contributors',
        component: () => import('../components/ContributorCredits.vue'),
      },
    ],
  },
];

const routerConvert = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export { routerConvert, routes };
