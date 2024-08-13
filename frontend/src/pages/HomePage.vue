<template>
  <div class="min-h-dvh grid" style="grid-template-rows: auto 1fr auto">
    <!--  Header  -->
    <HeaderComponent :auth="false"/>

    <!--  Main Content  -->
    <div class="flex h-full w-full justify-center items-center">
      <div
        class="grid xl:grid-cols-2 gap-10 sm:gap-14 h-full p-8 sm:p-20 xl:p-0 xl:pl-20 xl:pr-0 items-center justify-items-center overflow-hidden">
        <div class="">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold pb-6 lg:pb-10 text-balance">
            Drive Business Growth & On Demand Experiences
          </h1>
          <p class="font-light text-balance sm:text-base xl:text-lg">
            Dignissim a, velit odio sed convallis facilisi vulputate.
            Consectetur ultricies metus porttitor id urna, sapien mauris sed.
            Quis placerat ac urna, massa lectus. Consequat eu eu quam id sit
            consequat condimentum.
          </p>
          <q-btn unelevated no-caps color="primary" label="Create Configuration"
                 class="w-full sm:w-auto py-4 px-12 text-lg lg:text-xl xl:text-2xl mt-10 lg:mt-14 xl:mt-[4.5rem] rounded"/>
        </div>
        <div class="sm:h-full xl:-mr-14">
          <img src="src/assets/video-placeholder.svg" class="h-full" alt="video placeholder"/>
        </div>
      </div>
    </div>

    <!--  Footer  -->
    <FooterComponent/>
  </div>
</template>

<script>
import FooterComponent from 'components/FooterComponent.vue';
import HeaderComponent from 'components/HeaderComponent.vue';

export default {
  name: 'HomePage',
  components: {HeaderComponent, FooterComponent},
};
</script>
