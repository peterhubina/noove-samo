import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useAuthStore } from 'stores/auth';
import { pinia } from './pinia'; // Ensure pinia is correctly imported

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

// Set up request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore(pinia); // Access the Pinia store directly
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default boot(({ app }) => {
  // Make axios available globally
  app.config.globalProperties.$axios = axiosInstance;
});

// Optional: Type augmentation for Vue's instance properties
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axiosInstance;
  }
}
