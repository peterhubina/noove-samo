<template>
  <div class="grid grid-rows-[auto_1fr] pt-10 px-11 gap-8">
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-medium">Company Profile</h2>
      <q-btn
        label="Log Out"
        unelevated
        outline
        color="primary"
        class="w-max sm:px-8 rounded"
        @click="handleLogout"
      />
    </div>
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
          <p>Company Name</p>
          <q-input outlined :disable="changeInformation" aria-label="Company Name" v-model="companyName" type="text"
                   name="name"
                   class="mb-4 text-base"/>
          <p>Email</p>
          <q-input aria-label="email" outlined :disable="changeInformation" v-model="email" type="email" name="email"
                   class="mb-4 text-base"/>
          <p>Password</p>
          <q-input aria-label="password" outlined :disable="changeInformation" v-model="password"
                   :type="showPassword ? 'text' : 'password'"
                   class="text-base">
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility"
                      class="cursor-pointer"/>
            </template>
          </q-input>
          <div class="flex items-center justify-end mb-4">
            <router-link to="/reset-password" class="text-primary">Reset Password</router-link>
          </div>
          <q-btn v-if="changeInformation" unelevated no-caps outline color="primary"
                 @click="enableChange"
                 label="Change Information"
                 class="p-4 px-8 text-base font-medium rounded self-end"/>
          <q-btn v-if="!changeInformation" unelevated no-caps color="primary"
                 label="Update Company Information"
                 type="submit"
                 class="p-4 px-8 text-base font-medium rounded self-end"/>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { validateEmail, validatePassword } from 'src/utils/authValidation';
import { useAuthStore } from 'stores/auth';
import { getCurrentInstance, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'ProfilePage',
})

const authStore = useAuthStore();
const router = useRouter()

const {proxy} = getCurrentInstance();
const $q = useQuasar();
const axios = proxy.$axios;

const companyName = ref(authStore.user.companyName);
const email = ref(authStore.user.email);
const password = ref('')
const showPassword = ref(false)
const changeInformation = ref(true);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const enableChange = () => {
  changeInformation.value = !changeInformation.value;
}

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

async function onSubmit() {
  const emailError = validateEmail(email.value);
  const passwordError = validatePassword(false, password.value);

  if (emailError || passwordError) {
    $q.notify({
      type: 'negative',
      message: emailError || passwordError,
      position: 'top'
    });
    return;
  }

  try {
    const response = await axios.put('http://localhost:3000/user/editAccount', {
      name: companyName.value,
      email: email.value,
      password: password.value
    });

    localStorage.setItem('user', JSON.stringify(response.data.user));
    authStore.checkAuth()

    $q.notify({type: 'positive', message: response.data.message, position: 'top'});
  } catch (error) {
    $q.notify({type: 'negative', message: error.response?.data?.message || 'An error occurred', position: 'top'});
  }
}
</script>
