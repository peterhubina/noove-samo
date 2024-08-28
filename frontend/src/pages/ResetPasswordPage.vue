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

<script setup>
import FooterComponent from 'components/FooterComponent.vue';
import HeaderComponent from 'components/HeaderComponent.vue';
import { useAuthStore } from 'stores/auth';
import { validatePassword } from 'src/utils/authValidation';
import { getCurrentInstance, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter()
const {proxy} = getCurrentInstance();
const $q = useQuasar();
const axios = proxy.$axios;

const password = ref('')
const passwordRepeated = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

async function onSubmit() {
  const passwordError = validatePassword(true, password.value, passwordRepeated.value);

  // TODO: make password reset using email

  if (passwordError) {
    $q.notify({
      type: 'negative',
      message: passwordError,
      position: 'top'
    });
    return;
  }

  try {
    const response = await axios.put('http://localhost:3000/auth/passwordReset', {
      password: password.value,
      passwordRepeated: passwordRepeated.value
    });

    const authStore = useAuthStore();
    authStore.logout()

    $q.notify({type: 'positive', message: response.data.message, position: 'top'});
    await router.push('/login')
  } catch (error) {
    $q.notify({type: 'negative', message: error.response.data.message, position: 'top'});
  }
}
</script>
