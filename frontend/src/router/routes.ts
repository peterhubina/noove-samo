import { RouteRecordRaw } from 'vue-router';
import LoginPage from 'src/pages/LoginPage.vue';
import SignupPage from 'src/pages/SignupPage.vue';
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage.vue';
import ResetPasswordPage from 'pages/ResetPasswordPage.vue';
import HomePage from 'src/pages/HomePage.vue';
import DashboardLayout from 'layouts/DashboardLayout.vue';
import CreatePage from 'pages/CreatePage.vue';
import ConfigurationsPage from 'pages/ConfigurationsPage.vue';
import HowToUsePage from 'pages/HowToUsePage.vue';
import ProfilePage from 'pages/ProfilePage.vue';
import ConfigurationPage from 'pages/ConfigurationPage.vue';
import { useAuthStore } from 'stores/auth';
import UploadSpecification from 'components/UploadSpecification.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage },
  { path: '/home', redirect: '/' },

  { path: '/login', component: LoginPage, },
  { path: '/signup', component: SignupPage, },
  { path: '/forgot-password', component: ForgotPasswordPage, },
  { path: '/reset-password', component: ResetPasswordPage, },

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
      { path: 'configuration', component: ConfigurationPage },
      { path: 'create', component: CreatePage },
      { path: 'upload', component: UploadSpecification },
      { path: 'configurations', component: ConfigurationsPage },
      { path: 'how-to-use', component: HowToUsePage },
      { path: 'profile', component: ProfilePage }
    ],
  },

  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue'), },
];

export default routes;
