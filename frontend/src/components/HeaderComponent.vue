<template>
  <header class="flex no-wrap gap-6 sm:gap-10 lg:gap-12 justify-between items-center px-8 sm:px-14 lg:px-20 h-20">
    <router-link to="/">
      <img src="../assets/logo/asseco_centraleurope_logo.svg" alt="Logo" class="max-sm:hidden sm:block">
      <img src="../assets/logo/asseco_ce.svg" alt="Logo" class="max-sm:block sm:hidden">
    </router-link>

    <div v-if="auth" class="flex gap-4 sm:gap-6 no-wrap">
      <q-btn
        :label="loggedIn ? 'Log Out' : 'Log In'"
        unelevated
        outline
        color="primary"
        class="w-max sm:px-8 rounded"
        @click="handleAuthAction"
      />
      <router-link v-if="loggedIn" to="/dashboard/profile">
        <q-btn unelevated color="primary" round class="size-10 flex justify-center items-center">
          <img src="../assets/icon/profile.svg" alt="Profile" class="size-5">
        </q-btn>
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
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
