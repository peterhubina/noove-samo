<template>
  <div class="stepper-container">
    <!-- Step Content -->
    <q-card-section>
      <div class="text-h6">Upload your specification</div>
      <q-uploader label="Upload files in pdf format" accept=".pdf"/>
      <q-btn label="Analyze" color="primary" class="q-mt-md"/>
    </q-card-section>
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
