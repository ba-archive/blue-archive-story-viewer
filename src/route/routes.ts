import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    children: [
      {
        path: 'archive',
        name: 'studentSelector',
        component: () => import('../components/archive/StudentSelector.vue'),
        children: [
          {
            path: ':id',
            name: 'studentPersonalStory',
            component: () =>
              import('../components/archive/StudentPersonalHome.vue'),
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
                  import('../components/archive/StudentStoryContainer.vue'),
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
        path: '/contribute',
        name: 'Contribute',
        component: () => import('../components/ContributeToProject.vue'),
      },
      {
        path: '/friendlinks',
        name: 'Contributors',
        component: () => import('../components/FriendLinks.vue'),
      },
    ],
  },
];

const routerConvert = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export { routerConvert, routes };
