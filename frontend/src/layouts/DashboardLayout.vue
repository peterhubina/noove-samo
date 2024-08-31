<template>
  <div class="min-h-dvh grid grid-rows-[1fr_auto]">
    <div class="bg-section-div grid grid-cols-[auto_1fr]">
      <!-- Side nav -->
      <NavigationDrawerComponent/>
      <!-- Page -->
      <router-view/>
    </div>
    <!-- Footer -->
    <FooterComponent/>
  </div>
</template>

<script setup lang="ts">
import FooterComponent from 'components/FooterComponent.vue';
import NavigationDrawerComponent from 'components/NavigationDrawerComponent.vue';

defineOptions({
  name: 'DashboardLayout'
});
</script>
