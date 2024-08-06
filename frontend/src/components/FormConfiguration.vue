<template>
  <div class="form-configuration-container">

    <!-- Form Content -->
    <div class="form-content bg-white q-pa-lg q-mt-md q-mb-lg" style="border-radius: 8px;">
      <div class="text-center q-mb-lg">
        <p class="text-blue text-caption">CAPTION</p>
        <h4 class="q-mb-md">Bibendum amet at molestie mattis.</h4>
      </div>
      <q-list bordered>
        <q-expansion-item label="Who should use the app?" expand-icon="add">
          <!-- Additional details can go here if needed -->
        </q-expansion-item>
        <q-expansion-item label="What is included with my subscription?" expand-icon="add">
          <!-- Additional details can go here if needed -->
        </q-expansion-item>
        <q-expansion-item label="How do I get paid?" expand-icon="add">
          <!-- Additional details can go here if needed -->
        </q-expansion-item>
        <q-expansion-item label="Is my personal information safe?" expand-icon="add">
          <!-- Additional details can go here if needed -->
        </q-expansion-item>
        <q-expansion-item label="How can we get in touch?" expand-icon="add">
          <!-- Additional details can go here if needed -->
        </q-expansion-item>
      </q-list>
      <div class="flex flex-center q-mt-lg">
        <q-btn color="primary" label="Generate Configuration" @click="generateConfiguration" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormConfiguration',
  data() {
    return {
      step: '2' // current active step
    };
  },
  methods: {
    generateConfiguration() {
      // Logic for generating configuration can be implemented here

    }
  }
};
</script>

<style scoped>
.form-configuration-container {
  width: 100%;
}
.form-content {
  max-width: 800px;
  margin: 0 auto;
}
</style>
