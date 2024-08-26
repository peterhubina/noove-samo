<template>
  <div class="min-h-dvh grid" style="grid-template-rows: auto 1fr auto">
    <!--  Header  -->
    <HeaderComponent/>

    <!--  Main Content  -->
    <div class="flex h-full justify-center items-center">
      <div class="flex flex-col p-8 sm:w-[560px] font-light">
        <h1 class="text-2xl sm:text-4xl font-medium mb-6 sm:mb-10">Reset Password</h1>
        <q-form @submit="onSubmit">
          <q-input outlined v-model="password" label="New Password" :type="showPassword ? 'text' : 'password'"
                   class="mb-2">
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility"
                      class="cursor-pointer"/>
            </template>
          </q-input>
          <p class="text-xs mb-4">It must be a combination of minimum 8 letters, numbers, and symbols.</p>
          <q-input outlined v-model="passwordRepeated" label="New Password Repeated"
                   :type="showPassword ? 'text' : 'password'" class="mb-4">
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility"
                      class="cursor-pointer"/>
            </template>
          </q-input>
          <q-btn unelevated no-caps color="primary" label="Reset Password" type="submit"
                 class="w-full py-4 text-base font-medium rounded"/>
        </q-form>
      </div>
    </div>

    <!--  Footer  -->
    <FooterComponent/>
  </div>
</template>

<script>
import FooterComponent from 'components/FooterComponent.vue';
import HeaderComponent from 'components/HeaderComponent.vue';
import { useAuthStore } from 'stores/auth';
import { validatePassword } from 'src/utils/authValidation';

export default {
  components: {HeaderComponent, FooterComponent},
  data() {
    return {
      password: '',
      passwordRepeated: '',
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async onSubmit() {
      const passwordError = validatePassword(true, this.password, this.passwordRepeated);

      if (emailError || passwordError) {
        this.$q.notify({
          type: 'negative',
          message: emailError || passwordError,
          position: 'top'
        });
        return;
      }

      try {
        const response = await this.$axios.post('http://localhost:3000/auth/signup', {
          name: this.companyName,
          email: this.email,
          password: this.password
        });

        const authStore = useAuthStore();

        authStore.login({
          token: response.data.token,
          user: response.data.user,
        });

        this.$q.notify({type: 'positive', message: response.data.message, position: 'top'});
        this.$router.push('/')
      } catch (error) {
        this.$q.notify({type: 'negative', message: error.response.data.message, position: 'top'});
      }
    }
  }
};
</script>
