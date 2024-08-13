<template>
  <q-layout view="lHh Lpr lFf">
    <!--  Header  -->
    <HeaderComponent/>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <!-- Footer -->
    <FooterComponent/>
  </q-layout>
</template>

<script setup lang="ts">
import FooterComponent from 'components/FooterComponent.vue';
import HeaderComponent from 'components/HeaderComponent.vue';

defineOptions({
  name: 'MainLayout'
});

</script>
