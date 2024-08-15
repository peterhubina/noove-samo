import { RouteRecordRaw } from 'vue-router';
import LoginPage from 'src/pages/LoginPage.vue';
import SignupPage from 'src/pages/SignupPage.vue';
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage.vue';
import HomePage from 'src/pages/HomePage.vue';
import ConfigurationPage from 'pages/ConfigurationPage.vue';
import { useAuthStore } from 'stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login'); // Redirect to login if not authenticated
      } else {
        next();
      }
    },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'configuration', component: ConfigurationPage },
      //{ path: 'tinkering', component: TinkeringPage },
    ],
  },

  { path: '/', component: HomePage },
  { path: '/home', redirect: '/' },
  { path: '/login', component: LoginPage, },
  { path: '/signup', component: SignupPage, },
  { path: '/forgot-password', component: ForgotPasswordPage, },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
