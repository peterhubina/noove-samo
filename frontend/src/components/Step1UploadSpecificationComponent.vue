<template>
  <div class="flex flex-col justify-center items-center gap-10 pt-6">
    <div class="flex flex-col justify-center items-center gap-6">
      <h3 class="text-[2.625rem] font-medium">Upload your specification</h3>
      <p class="font-light text-lg text-neutral-500">Upload files in pdf. format</p>
    </div>
    <div class="flex flex-col justify-center items-center gap-8 w-2/4">
      <q-uploader auto-upload max-files="1" flat @added="onFileAdded" label="Upload files in pdf format"
                  accept=".pdf"
                  class="h-56 w-full drop-shadow"/>
      <q-btn :loading="loading" @click="onAnalyze" unelevated no-caps color="primary"
             class="font-medium text-xl px-8 h-14 w-56">Analyze
        <template v-slot:loading>
          <q-spinner-gears class="on-left"/>
          Analysing...
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadSpecification',
  emits: ['next'],
  data() {
    return {
      loading: false
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

      this.loading = true;
      console.log('Analyzing....')

      try {
        const formData = new FormData();
        formData.append('file', this.file);

        const response = await this.$axios.post('http://localhost:3000/upload/analyze', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // setTimeout(() => {
        //   console.log('analyzed')
        //   this.loading = false;
        //
        //   this.$emit('next', 0)
        // }, 5000)

        console.log('Analysis complete:', response.data);
      } catch (error) {
        console.error('Error during analysis:', error);
      }
    }
  }
};
</script>
