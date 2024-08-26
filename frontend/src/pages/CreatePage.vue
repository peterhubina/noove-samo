<template>
  <div class="grid grid-rows-[auto_1fr] pt-10 px-11 gap-8">
    <h2 class="text-3xl font-medium">Creating Configuration</h2>
    <div class="flex flex-col gap-12 justify-center items-center bg-white rounded-t">
      <div class="flex flex-col justify-center items-center gap-8">
        <h3 class="text-5xl font-medium">Start Configuring your new SAMO Platform</h3>
        <p class="font-light text-base text-neutral-500">You don’t have any unfinished configurations</p>
      </div>
      <q-btn to="upload" unelevated no-caps label="Start Configuration" color="primary"
             class="font-medium text-xl"/>
    </div>
  </div>

</template>

<script setup lang="ts">
defineOptions({
  name: 'CreatePage',
})
</script>
