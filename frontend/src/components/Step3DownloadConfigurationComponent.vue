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
import { defineEmits } from 'vue';

const emit = defineEmits(['reset']);

const download = async () => {
  const link = document.createElement('a');
  link.href = 'public/configurations/structure.zip';
  link.download = 'structure.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    emit('reset')
  }, 2000)
};
</script>
