<template>
  <div class="grid grid-rows-[auto_1fr] pt-10 px-11 gap-8">
    <h2 class="text-3xl font-medium">Creating Configuration</h2>

    <!-- Create stepper section -->
    <div class="w-full h-full">
      <!--   Start   -->
      <div v-if="start" class="h-full w-full flex flex-col gap-12 justify-center items-center bg-white rounded-t">
        <div class="flex flex-col justify-center items-center gap-8">
          <h3 class="text-5xl font-medium">Start Configuring your new SAMO Platform</h3>
          <p class="font-light text-lg text-neutral-500">You don’t have any unfinished configurations</p>
        </div>
        <q-btn @click="toggleStart" unelevated no-caps label="Start Configuration" color="primary"
               class="font-medium text-xl px-8 h-14"/>
      </div>

      <!--   Stepper   -->
      <StepperComponent v-if="!start"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import StepperComponent from 'components/StepperComponent.vue';

defineOptions({
  name: 'CreatePage',
})

const start = ref(true)
const toggleStart = () => {
  start.value = !start.value;
}

</script>
