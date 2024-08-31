<template>
  <div class="flex flex-col justify-center items-center gap-10 pt-6">
    <h3 class="text-[2.625rem] font-medium">Download SAMO project configuration</h3>
    <div class="flex flex-col justify-center items-center gap-6 w-2/4">
      <div @click="download"
           class="flex justify-center items-center h-36 w-1/2 rounded shadow border border-primary cursor-pointer">
        <q-icon name="download" size="60px" color="primary"/>
      </div>
      <q-btn @click="download" unelevated no-caps color="primary" label="Download Configuration"
             class="font-medium text-xl px-8 h-14"/>
    </div>
  </div>
</template>

<script setup>
import {defineEmits, getCurrentInstance} from 'vue';

const {proxy} = getCurrentInstance();
const axios = proxy.$axios;

const emit = defineEmits(['reset']);

const download = async () => {
  try {
    const response = await axios.get('http://localhost:3000/download-configuration', {
      responseType: 'blob'
    });

    // Create a new Blob from the response
    const blob = new Blob([response.data], { type: 'application/zip' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'configuration.zip';

    // Append the link to the body
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Remove the link after downloading

    // Emit 'reset' event after a short delay
    setTimeout(() => {
      emit('reset')
    }, 2000);
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
};
</script>
