<template>
  <div class="py-8">
    <h2 class="text-xl font-semibold mb-4">Fill out the form</h2>
    <!-- Form Fields -->
    <q-btn @click="submitForm" color="primary" label="Next"/>
  </div>
</template>

<script setup>
const emit = defineEmits(['next']);

const submitForm = () => {
  // TODO: Handle form submission logic
  emit('next');
};
</script>
