import { boot } from 'quasar/wrappers';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Set your base URL here
  // You can also add custom headers or other configurations
});

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
