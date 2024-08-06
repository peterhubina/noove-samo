<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="bg-grey-8 text-white q-pa-md" elevated>
      <div class="row items-center q-gutter-md">
        <div class="col">
          <img src="https://via.placeholder.com/100x50" alt="WebbyFrames Logo" style="height: 50px;" />
        </div>
        <div class="col text-center">
          CompanyName @ 2024. All rights reserved.
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">

defineOptions({
  name: 'MainLayout'
});

</script>
