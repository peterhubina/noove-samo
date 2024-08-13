<template>
  <div class="min-h-dvh grid" style="grid-template-rows: auto 1fr auto">
    <!--  Header  -->
    <HeaderComponent :auth="true"/>

    <!--  Main Content  -->
    <div class="flex h-full justify-center items-center">
      <div class="flex flex-col p-8 sm:w-[560px] font-light">
        <h1 class="text-2xl sm:text-4xl font-medium mb-4">Forgotten your password?</h1>
        <p class="mb-6 sm:mb-10 sm:text-base">There is nothing to worry about, we'll send you a message to help you
          reset your
          password.</p>
        <q-form @submit="onSubmit">
          <q-input outlined v-model="email" label="Email Address" type="email" name="email" class="mb-4"/>
          <q-btn unelevated no-caps color="primary" label="Send Reset Link" type="submit"
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

export default {
  components: {HeaderComponent, FooterComponent},
  data() {
    return {
      email: ''
    };
  },
  methods: {
    onSubmit() {
      // Handle the form submission for password reset
    }
  }
};
</script>

