const routes = [
  {
    path: "/",
    component: () => import("layouts/newLayout.vue"),
    children: [
      { path: "/index", component: () => import("pages/IndexPage.vue") },
      { path: "/", component: () => import("src/pages/TodosPage.vue") },
      // { path: "/index", component: () => import("pages/IndexPage.vue") },
      // { path: "/todos", component: () => import("src/pages/TodosPage.vue") },
      // { path: "/", component: () => import("src/pages/loginPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
