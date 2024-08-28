<template>
  <div class="flex flex-col justify-center items-center gap-10 py-6">
    <div class="flex flex-col justify-center items-center gap-6">
      <h3 class="text-[2.625rem] font-medium">Fill out the form</h3>
      <p class="font-light text-lg text-neutral-500">Make sure you correctly walk through all form fields!</p>
    </div>

    <!-- Form -->
    <div class="flex flex-col justify-center items-center gap-8 w-2/3">
      <!-- Dynamic Form Sections -->
      <div v-for='section in formSections' :key='section.title' class='w-full flex flex-col gap-4'>
        <h4 class='text-2xl font-medium'>{{ section.title }}</h4>
        <div v-for='question in section.questions' :key='question.label'
             class='flex items-center justify-between gap-4'>
          <label class='text-base font-normal'>{{ question.label }}</label>
          <div class='flex no-wrap'>
            <q-btn
              square
              unelevated no-caps color='primary'
              :outline="!question.answer"
              :icon="question.answer ? 'check' : 'close'"
              label='Yes'
              @click='question.answer = true'
              class="rounded-l transition-color duration-300 ease-out"
            />
            <q-btn
              square
              unelevated no-caps color='primary'
              :outline="question.answer"
              :icon="!question.answer ? 'check' : 'close'"
              label='No'
              @click='question.answer = false'
              class="rounded-r transition-color duration-300 ease-out"
            />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <q-btn
        @click='submitForm'
        unelevated no-caps color='primary'
        label='Submit Form'
        class='font-medium text-xl px-8 h-14'
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['next']);

// Dynamic form sections and questions
const formSections = ref([
  {
    title: 'Basic Organization Information',
    questions: [
      {
        label: 'Multiple legal entities within the organization:',
        answer: false,
      },
      {
        label: 'Employee list in the system:',
        answer: true,
      },
    ],
  },
  {
    title: 'Locations and Branches',
    questions: [
      {
        label: 'Multiple branches or locations:',
        answer: true,
      },
      {
        label: 'Branches in different cities:',
        answer: false,
      },
      {
        label: 'Map showing branches:',
        answer: false,
      },
      {
        label: 'Record the number of employees at each branch:',
        answer: false,
      },
    ],
  },
  {
    title: 'Asset Management - Real Estate',
    questions: [
      {
        label: 'Tracking properties in the system:',
        answer: true,
      },
      {
        label: 'Tracking individual properties by location:',
        answer: true,
      },
      {
        label: 'Rentals and property usage:',
        answer: true,
      },
    ],
  },
]);

const submitForm = () => {
  console.log('Form Data:', formSections.value);
  // TODO: Handle form submission logic
  emit('next');
};
</script>
