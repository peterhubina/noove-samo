<template>
  <div class="flex flex-col h-screen no-wrap">
    <div class="flex ml-16 h-20">
      <router-link to="/" class="flex">
        <img src="src/assets/asseco_centraleurope_logo.svg" alt="Logo">
      </router-link>
    </div>
    <div class="flex h-full justify-center items-center">
      <div class="flex flex-col p-8 w-[560px] font-light">
        <h1 class="text-4xl font-medium mb-10">Log In</h1>
        <q-form @submit="onSubmit">
          <q-input outlined v-model="email" label="Email Address" type="email" name="email" class="mb-4"/>
          <q-input outlined v-model="password" label="Password" :type="showPassword ? 'text' : 'password'" class="mb-2">
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility"
                      class="cursor-pointer"/>
            </template>
          </q-input>
          <p class="text-xs mb-4">It must be a combination of minimum 8 letters, numbers, and symbols.</p>
          <div class="flex items-center justify-between mb-4">
            <q-checkbox v-model="rememberMe" label="Remember me"/>
            <router-link to="/forgot-password" class="text-primary">Forgot Password?</router-link>
          </div>
          <q-btn unelevated color="primary" label="Log In" type="submit" class="w-full py-4 text-base font-medium"/>
        </q-form>
        <span class="h-[2px] w-full bg-neutral-200 mt-8"></span>
        <p class="text-gray-600 mt-2">No account yet?
          <router-link to="/signup" class="text-primary">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    onSubmit() {
      // Handle login logic here
    }
  },
};
</script>
