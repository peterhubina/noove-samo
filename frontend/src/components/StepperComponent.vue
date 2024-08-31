<template>
  <q-stepper v-model="currentStep" header-nav flat class="w-full h-full">
    <q-step v-for="step in steps" :key="step.id" :name="step.id" :title="step.title" :done="step.done" class="h-full">
      <component :is="step.component" @next="nextStep" @reset="reset"/>
    </q-step>
  </q-stepper>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import Step1UploadSpecificationComponent from 'components/Step1UploadSpecificationComponent.vue';
import Step2FormComponent from 'components/Step2FormComponent.vue';
import Step3DownloadConfigurationComponent from 'components/Step3DownloadConfigurationComponent.vue';

const currentStep = ref(1);
const emit = defineEmits(['done']);

const steps = [
  {id: 1, title: 'Upload Specification', component: Step1UploadSpecificationComponent, done: false},
  {id: 2, title: 'Form', component: Step2FormComponent, done: false},
  {id: 3, title: 'Download Configuration', component: Step3DownloadConfigurationComponent, done: false},
];

function nextStep(done) {
  if (currentStep.value < steps.length) {
    currentStep.value += 1;
    steps[done].done = true
  }
}

function reset() {
  currentStep.value = 1;
  steps.forEach(step => {
    step.done = false;
  })
  emit('done');
}
</script>
