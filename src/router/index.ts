import { createRouter, createWebHistory } from "vue-router";
import TestVue from "../views/Test.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/test",
      name: "test",
      component: TestVue,
    },
  ],
});

export default router;
