import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginRouter from "@/views/Login/router.js";
import OverviewRouter from "@/views/Overview/router.js";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/overview"
  },
  ...LoginRouter,
  ...OverviewRouter

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
