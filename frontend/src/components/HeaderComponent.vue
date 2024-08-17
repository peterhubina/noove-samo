<template>
  <header class="flex no-wrap gap-12 sm:gap-0 justify-between items-center px-8 sm:px-20 h-20">
    <router-link to="/">
      <img src="src/assets/asseco_centraleurope_logo.svg" alt="Logo" class="max-sm:hidden sm:block">
      <img src="src/assets/asseco_ce.svg" alt="Logo" class="max-sm:block sm:hidden">
    </router-link>

    <q-btn
      v-if="auth"
      :label="loggedIn ? 'Log Out' : 'Log In'"
      unelevated
      outline
      color="primary"
      class="w-max sm:px-8 rounded"
      @click="handleAuthAction"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent, computed  } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    auth: {
      type: Boolean,
      default: false,
    },
  },
  name: 'HeaderComponent',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const loggedIn = computed(() => authStore.isAuthenticated);

    const handleAuthAction = () => {
      if (authStore.isAuthenticated) {
        authStore.logout();
      } else {
        router.push('/login');
      }
    };

    return {
      loggedIn,
      handleAuthAction,
    };
  },
});
</script>
