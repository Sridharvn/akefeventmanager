const routes = [
  {
    path: "/",
    component: () => import("layouts/newLayout.vue"),
    children: [
      { path: "/index", component: () => import("pages/IndexPage.vue") },
      { path: "/", component: () => import("src/pages/TodosPage.vue") },
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
