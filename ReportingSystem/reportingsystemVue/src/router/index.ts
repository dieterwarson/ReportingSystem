import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import jwt, { decode } from "jsonwebtoken";

import ReportingService from '@/services/ReportingService';

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
    path: '/reportssearch',
    name: 'ReportsSearch',
    component: () =>
      import(/* webpackChunckName: "ReportsSearch" */ '../views/ReportsSearch.vue'),
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
    path: '/changeevent',
    name: 'ChangeEvent',
    component: () => import(/* webChunckName: "ChangeEvent" */ '../views/ChangeEvent.vue'),
  },
  {
    path: '/userlist',
    name: 'Userlist',
    component: () => import(/*webChunckName: "Userlist" */ '../views/Userlist.vue'),
  },
  {
    path: '/changepermissions',
    name: 'ChangePermissions',
    component: () => import(/*webChunckName: "Userlist" */ '../views/changePermissions.vue'),
  },
  {
    path: '/printReportView',
    name: 'PrintReportView',
    component: () => import(/*webChunckName: "Userlist" */ '../views/PrintReportView.vue'),
  },
  {
    path:'*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const response = ReportingService.checkAuthentication();
  let ReportId : any;
  const token = window.localStorage.getItem("token");
  const decodedToken : any = jwt.decode(token!)!;
  const test = ReportingService.latestReportId().then(result => {
    ReportId = result
  });
  response.then(res => {
    if (to.path !== '/login' && !res) next({name: 'Login'});
    else if (to.name === 'Login' && res) next({name: 'Home'})
    else if (to.name === 'ReportView' && to.query.reportId == "18" && !decodedToken.seePreviousShift) next({name: 'Home'})
    else if (to.name === 'ReportView' && to.query.reportId == "18" && decodedToken.seePreviousShift) next()
    else if (to.name === 'ReportView' && !decodedToken.seeReports) next({name: 'Home'})
    else if (to.name === 'Reports' && !decodedToken.seeReports) next({name: 'Home'})
    else if (to.name === 'ChangeEvent' && !decodedToken.seeReports) next({name: 'Home'})
    else if (to.name === 'ReportsSearch' && !decodedToken.seeReports) next({name: 'Home'})
    else if (to.name === 'Statistics' && !decodedToken.seeStatistics) next({name: 'Home'})
    else if (to.name === 'ChangePermissions' && decodedToken.rights > 0) next({name: 'Home'})
    else if (to.name === 'Userlist' && decodedToken.rights > 0) next({name: 'Home'})
    else if (to.name === 'Admin' && decodedToken.rights > 0) next({name: 'Home'})
    else if (to.name === 'Notifications' && !decodedToken.seeNotifications) next({name: 'Home'})
    else if (to.name === 'AddReport' && !decodedToken.makeReports) next({name: 'Home'})

    else next();

  });
  
})

export default router;
