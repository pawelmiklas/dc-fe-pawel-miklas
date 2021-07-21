import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Favorites from "./pages/Favorites.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/favorites",
      component: Favorites,
    },
  ],
});
