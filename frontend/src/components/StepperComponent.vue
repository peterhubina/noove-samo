<template>
  <q-stepper v-model="currentStep" header-nav flat class="w-full h-full">
    <q-step v-for="step in steps" :key="step.id" :name="step.id" :title="step.title" class="h-full">
      <component :is="step.component" @next="nextStep" @previous="previousStep"/>
    </q-step>
  </q-stepper>
</template>

<script setup>
import { ref } from 'vue';
import Step1UploadSpecificationComponent from 'components/Step1UploadSpecificationComponent.vue';
import Step2FormComponent from 'components/Step2FormComponent.vue';
import Step3DownloadConfigurationComponent from 'components/Step3DownloadConfigurationComponent.vue';

const currentStep = ref(1);

const steps = [
  {id: 1, title: 'Upload Specification', component: Step1UploadSpecificationComponent},
  {id: 2, title: 'Form', component: Step2FormComponent},
  {id: 3, title: 'Download Configuration', component: Step3DownloadConfigurationComponent},
];

function nextStep() {
  if (currentStep.value < steps.length) {
    currentStep.value += 1;
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
}
</script>
