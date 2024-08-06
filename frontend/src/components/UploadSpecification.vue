<template>
  <div class="stepper-container">

    <!-- Step Content -->
    <div class="step-content bg-white q-pa-lg q-mt-md q-mb-lg" style="border-radius: 8px;">
      <div class="text-center">
        <p class="text-blue text-caption">UPLOAD</p>
        <h4 class="q-mb-md">Upload your specification</h4>
        <q-btn label="Upload" flat color="primary" />
        <div class="q-my-md">
          <q-img src="https://via.placeholder.com/600x200" ratio="4/3" />
        </div>
        <q-btn color="primary" label="Analyze" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadSpecification',
  data() {
    return {
      step: '1' // default starting step
    };
  }
};
</script>

<style scoped>
.stepper-container {
  width: 100%;
}
.step-content {
  max-width: 800px;
  margin: 0 auto;
}
</style>
