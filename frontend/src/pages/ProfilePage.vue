<template>
  <div class="grid grid-rows-[auto_1fr] pt-10 px-11 gap-8">
    <h2 class="text-3xl font-medium">Company Profile</h2>
    <div class="grid grid-cols-[auto_1fr] gap-4">
      <!--   Company Logo   -->
      <div class="bg-white p-4 flex flex-col gap-6 h-min rounded">
        <h3 class="text-lg font-medium">Company Logo</h3>
        <div class="flex gap-6">
          <span class="bg-neutral-200 rounded-full size-24 flex justify-center items-center">
            <img src="src/assets/icon/profile.svg" alt="company logo"/>
          </span>
          <div class="flex flex-col gap-1 justify-center">
            <q-btn unelevated outline no-caps color="primary" label="Upload Logo"
                   class="px-7"/>
            <q-btn unelevated icon="close" flat no-caps color="negative" label="Remove"
                   class="px-7 font-light"/>
          </div>
        </div>
        <span class="h-[1px] rounded bg-neutral-200"/>
        <div class="flex flex-col gap-2">
          <p class="text-lg font-normal">Image requirements:</p>
          <ol class="font-light">
            <li>Min. 400 x 400px</li>
            <li>Max. 2MB</li>
            <li>Company Logo</li>
          </ol>
        </div>
      </div>

      <!--   Company Details   -->
      <div class="bg-white p-4 flex flex-col gap-6 h-min rounded">
        <h3 class="text-lg font-medium">Company Details</h3>
        <q-form @submit="onSubmit" class="flex flex-col gap-2">
          <q-input outlined v-model="companyName" label="Company Name" type="text" name="name" class="mb-4"/>
          <q-input outlined v-model="email" label="Email Address" type="email" name="email" class="mb-4"/>
          <q-input outlined v-model="password" label="Password" :type="showPassword ? 'text' : 'password'">
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility"
                      class="cursor-pointer"/>
            </template>
          </q-input>
          <div class="flex items-center justify-end mb-4">
            <router-link to="/reset-password" class="text-primary">Reset Password</router-link>
          </div>
          <q-btn unelevated no-caps color="primary" label="Update Company Information" type="submit"
                 class="p-4 px-8 text-base font-medium rounded self-end"/>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { validateEmail, validatePassword } from 'src/utils/authValidation';
import { useAuthStore } from 'stores/auth';
import { ref } from 'vue';

defineOptions({
  name: 'ProfilePage',
})

const companyName = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function onSubmit() {
  const emailError = validateEmail(email.value);
  const passwordError = validatePassword(false, password.value);

  if (emailError || passwordError) {
    this.$q.notify({
      type: 'negative',
      message: emailError || passwordError,
      position: 'top'
    });
    return;
  }

  try {
    const response = await this.$axios.post('http://localhost:3000/auth/login', {
      email: this.email,
      password: this.password
    });

    const authStore = useAuthStore();

    authStore.login({
      token: response.data.token,
      user: response.data.user,
    });

    this.$q.notify({ type: 'positive', message: response.data.message, position: 'top' });
    this.$router.push('/')
  } catch (error) {
    this.$q.notify({ type: 'negative', message: error.response.data.message, position: 'top' });
  }
}

</script>
