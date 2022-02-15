import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component:()=>import("@/views/home"),
    redirect: { name: "my" },
    children: [
      {
        path: "my",
        name: "my",
        component: () => import("@/views/my/my.vue"),
      },
      {
        path:'app',
        name:'app',
        component:()=>import("@/views/app/application.vue")

      }
    ],
  },
];
const router = createRouter({
  // hash 模式
  history: createWebHashHistory(),
  routes,
});

export default router;
