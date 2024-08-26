<template>
  <div class="q-pa-none">
    <div class="row no-wrap">
      <!-- Sidebar -->

      <div class="col-2 bg-grey-2 q-pa-sm">
        <div class="q-mb-md text-center">
          <img src="https://via.placeholder.com/150" alt="WebbyFrames Logo"/>
        </div>
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Create</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="tune"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Configurations</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="info"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>About</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Main Content -->
      <div class="col-10">
        <div class="q-pa-md">
          <h2>Creating Configuration</h2>

          <q-stepper v-model="activeStep" animated color="primary" navigation>
            <!-- Step 1: Upload Specification -->
            <q-step name="1" title="Upload Specification" subtitle="Optional Label">
              <div class="bg-white q-pa-lg q-mt-md q-mb-lg" style="border-radius: 8px;">
                <p class="text-center text-blue text-caption">UPLOAD</p>
                <h4 class="q-mb-md">Upload your specification</h4>
                <q-btn label="Upload" flat color="primary"/>
                <div class="q-my-md">
                  <q-img src="https://via.placeholder.com/600x200" ratio="4/3"/>
                </div>
                <q-btn color="primary" label="Analyze" @click="nextStep"/>
              </div>
            </q-step>

            <!-- Step 2: Form -->
            <q-step name="2" title="Form" subtitle="Active Step Text">
              <div class="bg-white q-pa-lg q-mt-md q-mb-lg" style="border-radius: 8px;">
                <p class="text-center text-blue text-caption">CAPTION</p>
                <h4 class="q-mb-md">Bibendum amet at molestie mattis.</h4>
                <q-list bordered>
                  <q-expansion-item label="Who should use the app?" expand-icon="add">
                    <!-- Additional details can go here if needed -->
                  </q-expansion-item>
                  <q-expansion-item label="What is included with my subscription?" expand-icon="add">
                    <!-- Additional details can go here if needed -->
                  </q-expansion-item>
                  <q-expansion-item label="How do I get paid?" expand-icon="add">
                    <!-- Additional details can go here if needed -->
                  </q-expansion-item>
                  <q-expansion-item label="Is my personal information safe?" expand-icon="add">
                    <!-- Additional details can go here if needed -->
                  </q-expansion-item>
                  <q-expansion-item label="How can we get in touch?" expand-icon="add">
                    <!-- Additional details can go here if needed -->
                  </q-expansion-item>
                </q-list>
                <div class="flex pt-6 justify-between">
                  <q-btn label="Back" color="secondary" @click="prevStep"/>
                  <q-btn color="primary" label="Generate Configuration" @click="nextStep"/>
                </div>
              </div>
            </q-step>

            <!-- Step 3: Download Configuration -->
            <q-step name="3" title="Download Configuration" subtitle="Complete Step 2 to enable">
              <div class="bg-white q-pa-lg q-mt-md q-mb-lg" style="border-radius: 8px;">
                <div class="text-center q-mb-lg">
                  <p class="text-blue text-caption">CAPTION</p>
                  <h4 class="q-mb-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet at molestie mattis.
                  </h4>
                </div>
                <div class="row justify-around q-mb-lg">
                  <div v-for="i in 4" :key="i" class="col-3">
                    <q-img src="https://via.placeholder.com/150" ratio="4/3"/>
                  </div>
                </div>
                <div class="flex flex-center">
                  <q-btn color="primary" label="Download Configuration" @click="downloadConfiguration"/>
                </div>
              </div>
            </q-step>
          </q-stepper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationStepper',
  data() {
    return {
      activeStep: 1 // Current active step
    };
  },
  methods: {
    nextStep() {
      if (this.activeStep < 3) this.activeStep += 1;
    },
    prevStep() {
      if (this.activeStep > 1) this.activeStep -= 1;
    },
    downloadConfiguration() {
      // Logic for downloading configuration
      console.log('Downloading Configuration...');
    }
  }
};
</script>
