<template>
    <q-page class="flex flex-center q-pa-md q-gutter-sm">
      <q-card flat bordered class="q-pa-md" style="width: 100%; max-width: 600px;">
        <div class="text-center q-pa-md">
          <h4>Forgotten your password?</h4>
          <p>There is nothing to worry about, we'll send you a message to help you reset your password.</p>
          <q-form @submit="onSubmit">
            <q-input filled v-model="email" label="Email Address" placeholder="Enter company's email address" type="email" />
            <q-btn type="submit" color="primary" label="Send Reset Link" class="full-width q-mt-md" />
          </q-form>
        </div>
      </q-card>
    </q-page>
  </template>
  
  <script>
  export default {
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
  
  <style>
  .q-page {
    background-color: #f5f5f5;
  }
  </style>
  