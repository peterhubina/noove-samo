<template>
    <q-page class="q-pa-none">

      <!-- Main Content -->
      <q-page-container>
        <q-page class="bg-grey-1">
          <div class="q-pa-xl flex flex-center">
            <div class="row items-center q-mx-md" style="max-width: 800px;">
              <div class="col-12 col-md-6 q-pa-md">
                <h1 class="text-h4 font-bold">
                  Drive Business Growth & On Demand Experiences
                </h1>
                <p class="q-mt-md">
                  Dignissim a, velit odio sed convallis facilisi vulputate.
                  Consectetur ultricies metus porttitor id urna, sapien mauris sed.
                  Quis placerat ac urna, massa lectus. Consequat eu eu quam id sit
                  consequat condimentum.
                </p>
                <q-btn color="primary" label="Primary Action" class="q-mt-md" />
              </div>
              <div class="col-12 col-md-6 q-pa-md">
                <q-img
                  src="https://via.placeholder.com/400x300"
                  ratio="4/3"
                  style="border-radius: 8px;"
                />
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>

    </q-page>
  </template>

  <script>
  export default {
    name: 'HomePage'
  };
  </script>

  <style>
  .q-page-container {
    min-height: 100vh;
  }
  </style>
