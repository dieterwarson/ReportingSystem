import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/addreport',
    name: 'AddReport',
    component: () =>
      import(/* webpackChunckName: "AddReport" */ '../views/AddReport.vue'),
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () =>
      import(/* webpackChunckName: "Reports" */ '../views/Reports.vue'),
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () =>
      import(
        /* webpackChunckName: "Notifications" */ '../views/Notifications.vue'
      ),
  },
  {
    path: '/overviewshift',
    name: 'OverviewShift',
    component: () =>
      import(
        /* webpackChunckName: "OverviewShift" */ '../views/OverviewShift.vue'
      ),
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () =>
      import(/* webpackChunckName: "Statistics" */ '../views/Statistics.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunckName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/reportview',
    name: 'ReportView',
    component: () =>
      import(/* webpackChunckName: "Login" */ '../views/ReportView.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webChunckName: "Admin" */ '../views/Admin.vue'),
  },
  {
    path: '/userlist',
    name: 'Userlist',
    component: () => import(/*webChunckName: "Userlist" */ '../views/Userlist.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
