<template>
  <div class="q-pa-none">
    <div class="row no-wrap">

      <!-- Main Content -->
      <div class="col-10">
        <div class="q-pa-md">
          <ConfigurationStepper/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigurationStepper from 'src/components/ConfigurationStepper.vue';

export default {
  name: 'ConfigurationPage',
  components: {
    ConfigurationStepper
  }
};
</script>
