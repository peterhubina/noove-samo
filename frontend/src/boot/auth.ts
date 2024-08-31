import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'stores/auth';

export default boot(() => {
  const authStore = useAuthStore();
  authStore.checkAuth(); // Check auth on app load
});
