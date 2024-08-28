<template>
  <div class="flex flex-col justify-center items-center gap-10 pt-6">
    <div class="flex flex-col justify-center items-center gap-6">
      <h3 class="text-[2.625rem] font-medium">Upload your specification</h3>
      <p class="font-light text-lg text-neutral-500">Upload files in pdf. format</p>
    </div>
    <div class="flex flex-col justify-center items-center gap-8 w-2/4">
      <q-uploader flat :on-uploaded="handleFile" label="Upload files in pdf format" accept=".pdf"
                  class="h-56 w-full drop-shadow"/>
      <q-btn @click="analyzeFile" unelevated no-caps :disable="!file" color="primary" label="Analyze"
             class="font-medium text-xl px-8 h-14"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const file = ref(null);
const emit = defineEmits(['next']);

function handleFile(event) {
  file.value = event.target.files[0];
}

function analyzeFile() {
  // TODO: Handle analyse logic
  if (file.value) {
    emit('next');
  }
}
</script>
