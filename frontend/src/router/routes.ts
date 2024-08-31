import { RouteRecordRaw } from 'vue-router';
import LoginPage from 'src/pages/LoginPage.vue';
import SignupPage from 'src/pages/SignupPage.vue';
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage.vue';
import HomePage from 'src/pages/HomePage.vue';
import DashboardLayout from 'layouts/DashboardLayout.vue';
import CreatePage from 'pages/CreatePage.vue';
import ConfigurationsPage from 'pages/ConfigurationsPage.vue';
import HowToUsePage from 'pages/HowToUsePage.vue';
import ProfilePage from 'pages/ProfilePage.vue';
import { useAuthStore } from 'stores/auth';
import ResetPasswordConfirmPage from 'pages/ResetPasswordConfirmPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage },
  { path: '/home', redirect: '/' },

  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/forgot-password', component: ForgotPasswordPage },
  {
    path: '/password-reset',
    redirect: '/password-reset/request',
    children: [
      { path: 'request', component: ForgotPasswordPage, props: { isResetPassword: true } },
      { path: 'confirm', component: ResetPasswordConfirmPage },
    ]
  },

  {
    path: '/dashboard',
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        next('/login'); // Redirect to login if not authenticated
      } else {
        next();
      }
    },
    children: [
      { path: '', redirect: '/dashboard/create' },
      { path: 'create', component: CreatePage },
      { path: 'configurations', component: ConfigurationsPage },
      { path: 'how-to-use', component: HowToUsePage },
      { path: 'profile', component: ProfilePage }
    ],
  },

  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue'), },
];

export default routes;
