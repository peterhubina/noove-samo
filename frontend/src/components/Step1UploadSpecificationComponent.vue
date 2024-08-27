<template>
  <div class="flex flex-col justify-center items-center gap-12">
    <div class="flex flex-col justify-center items-center gap-8 pt-10">
      <h3 class="text-5xl font-medium">Upload your specification</h3>
      <p class="font-light text-lg text-neutral-500">Upload files in pdf. format</p>
    </div>
    <div class="flex flex-col justify-center items-center gap-8 w-2/4">
      <q-uploader flat @added="onFileAdded" label="Upload files in pdf format" accept=".pdf"
                  class="h-80 w-full drop-shadow"/>
      <q-btn @click="onAnalyze" unelevated no-caps color="primary" label="Analyze"
             class="font-medium text-xl px-8 h-14"/>

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
