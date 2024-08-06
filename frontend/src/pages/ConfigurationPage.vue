<template>
  <q-page class="q-pa-none">
    <div class="row no-wrap">

      <!-- Main Content -->
      <div class="col-10">
        <div class="q-pa-md">
          <ConfigurationStepper />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ConfigurationStepper from 'src/components/ConfigurationStepper.vue';
//import TinkeringComponent from 'components/TinkeringComponent.vue';

export default {
  name: 'ConfigurationPage',
  components: {
    ConfigurationStepper
  }
};
</script>

<style>
.q-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
