import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    children: [
      {
        path: "archive",
        name: "学生个人剧情",
        component: () => import("../components/StudentSelector.vue"),
        children: [
          {
            path: ":student/momotalk",
            name: "momotalk",
            component: () => import("../components/MomotalkContainer.vue"),
          },
          {
            path: ":student/kizunaStory",
            name: "story",
            component: () => import("../components/StoryViewer.vue"),
          },
        ],
      },
      {
        path: "mainStory",
        name: "主线剧情",
        component: () => import("../components/MainStoryHome.vue"),
      },
      {
        path: "miniStory",
        name: "学生小剧情",
        component: () => import("../components/MiniStoryHome.vue"),
      },
      {
        path: "groupStory",
        name: "社团剧情",
        component: () => import("../components/GroupStoryHome.vue"),
      },
    ],
  },
];

const routerConvert = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export { routerConvert, routes };
