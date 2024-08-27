<template>
  <div class="stepper-container">
    <!-- Step Content -->
    <q-card-section>
      <div class="text-h6">Upload your specification</div>
      <q-uploader label="Upload files in pdf format" accept=".pdf" @added="onFileAdded"/>
      <q-btn label="Analyze" color="primary" class="q-mt-md" @click="onAnalyze"/>
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
  },
  methods: {
    onFileAdded(file) {
      this.file = file[0]; // get the first file from the uploader
      console.log('File added:', this.file);
    },
    async onAnalyze() {
      if (!this.file) {
        alert('Please upload a PDF file.');
        return;
      }

      console.log('Analyzing....')

      try {
        const formData = new FormData();
        formData.append('file', this.file);

        const response = await this.$axios.post('http://localhost:3000/upload/analyze', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Analysis complete:', response.data);
      } catch (error) {
        console.error('Error during analysis:', error);
      }
    }
  }
};
</script>
