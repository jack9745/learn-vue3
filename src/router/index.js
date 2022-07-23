import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/home"),
    redirect: { name: "my" },
    children: [
      {
        path: "my",
        name: "my",
        component: () => import("@/views/my/my.vue"),
      },
      {
        path: "app",
        name: "app",
        component: () => import("@/views/app/application.vue"),
      },
      {
        name: "test",
        path: "test",
        component: () => import("@/views/test.vue"),
      },
      {
        name: "core",
        path: "core",
        component: () => import("@/views/core.vue"),
      },
      {
        name: "util",
        path: "util",
        component: () => import("@/views/util.vue"),
      },
      {
        name: "diff",
        path: "diff",
        component: () => import("@/views/diff.vue"),
      },
      {
        name: "form",
        path: "form",
        component: () => import("@/views/form.vue"),
      },
      {
        name: "table",
        path: "table",
        component: () => import("@/views/table.vue"),
      },
    ],
  },
];
const router = createRouter({
  // hash 模式
  history: createWebHashHistory(),
  routes,
});

export default router;
