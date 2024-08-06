<template>
  <div class="download-configuration-container">

    <!-- Content -->
    <div class="content-container bg-white q-pa-lg q-mt-md q-mb-lg" style="border-radius: 8px;">
      <div class="text-center q-mb-lg">
        <p class="text-blue text-caption">CAPTION</p>
        <h4 class="q-mb-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet at molestie mattis.
        </h4>
      </div>
      <div class="row justify-around q-mb-lg">
        <div v-for="i in 4" :key="i" class="col-3">
          <q-img src="https://via.placeholder.com/150" ratio="4/3" />
        </div>
      </div>
      <div class="flex flex-center">
        <q-btn color="primary" label="Download Configuration" @click="downloadConfiguration" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadConfiguration',
  data() {
    return {
      step: '3' // current active step
    };
  },
  methods: {
    downloadConfiguration() {
      // Logic for downloading configuration can be implemented here

    }
  }
};
</script>

<style scoped>
.download-configuration-container {
  width: 100%;
}
.content-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
