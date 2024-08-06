<template>
    <q-page class="flex flex-center q-pa-md q-gutter-sm">
      <q-card flat bordered class="q-pa-md" style="width: 100%; max-width: 600px;">
        <div class="row no-wrap">
          <div class="col-6 q-pa-md bg-grey-2">
            <q-img src="https://via.placeholder.com/300x300" ratio="4/3" />
          </div>
          <div class="col-6 q-pa-md">
            <q-form @submit="onSubmit">
              <h4 class="text-center">Sign Up</h4>
              <q-input filled v-model="companyName" label="Company's Name" />
              <q-input filled v-model="email" label="Email" type="email" />
              <q-input filled v-model="password" label="Password" type="password">
                <template v-slot:append>
                  <q-icon name="visibility" />
                </template>
              </q-input>
              <q-checkbox v-model="termsAccepted" label="Vestibulum faucibus odio vitae arcu auctor lectus." />
              <q-btn type="submit" color="primary" label="Button Text" class="full-width" />
              <q-separator />
              <div class="text-center q-mt-md">
                <q-btn flat label="Already have an account?" class="text-primary" />
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
        companyName: '',
        email: '',
        password: '',
        termsAccepted: false
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
  