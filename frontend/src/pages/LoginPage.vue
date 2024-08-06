<template>
    <q-page class="flex flex-center q-pa-md q-gutter-sm">
      <q-card flat bordered class="q-pa-md" style="width: 100%; max-width: 600px;">
        <div class="row no-wrap">
          <div class="col-6 q-pa-md bg-grey-2">
            <q-img src="https://via.placeholder.com/300x300" ratio="4/3" />
          </div>
          <div class="col-6 q-pa-md">
            <q-form @submit="onSubmit">
              <h4 class="text-center">Log In</h4>
              <q-input filled v-model="email" label="Email Address" type="email" />
              <q-input filled v-model="password" label="Password" type="password">
                <template v-slot:append>
                  <q-icon name="visibility" />
                </template>
              </q-input>
              <div class="text-caption q-mb-md">
                It must be a combination of minimum 8 letters, numbers, and symbols.
              </div>
              <div class="row items-center q-mb-md">
                <q-checkbox v-model="rememberMe" label="Remember me" />
                <q-space />
                <q-btn flat label="Forgot Password?" class="text-primary" />
              </div>
              <q-btn type="submit" color="primary" label="Log In" class="full-width" />
              <q-separator />
              <div class="text-center q-mt-md">
                <q-btn flat label="No account yet? Sign Up" class="text-primary" />
              </div>
            </q-form>
          </div>
        </div>
      </q-card>
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false
      };
    },
    methods: {
      onSubmit() {
        // Handle the form submission
      }
    }
  };
  </script>
  
  <style>
  .q-page {
    background-color: #f5f5f5;
  }
  </style>
  