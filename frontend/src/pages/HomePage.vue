<template>
  <div class="min-h-dvh grid grid-rows-[auto_1fr_auto]">
    <!--  Header  -->
    <HeaderComponent :auth="true"/>

    <!--  Main Content  -->
    <div class="flex h-full w-full justify-center items-center">
      <div
        class="grid xl:grid-cols-2 gap-10 sm:gap-14 h-full p-8 sm:p-14 lg:p-20 xl:p-0 xl:pl-20 xl:pr-0 items-center justify-items-center overflow-hidden">
        <div class="">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold pb-6 lg:pb-10 text-balance">
            Start Configuring Your Business Software
          </h1>
          <p class="font-light text-balance sm:text-base xl:text-lg">
            Welcome to the SAMO project wizard, where you can easily create a configuration tailored exactly to your
            company's
            needs. With just a few clicks, you'll get a fully customized solution that will support your business growth
            and enhance your daily processes. Our automated platform ensures that your solution will be ready to use
            within minutes.
            <br><br>Click "Create Configuration" and start today.
          </p>
          <router-link to="/dashboard">
            <q-btn unelevated no-caps color="primary" label="Create Configuration"
                   class="w-full sm:w-auto py-4 px-12 text-lg lg:text-xl xl:text-2xl mt-8 lg:mt-10 xl:mt-12 2xl:mt-16 3xl:mt-[4.5rem] rounded"/>
          </router-link>
        </div>
        <div class="sm:h-full w-full xl:-mr-20 xl:group xl:hover:mr-10 2xl:hover:mr-12 xl:transition-all xl:duration-300">
          <VideoTutorial class="xl:group-hover:scale-105 xl:transition-all xl:duration-300" />
        </div>
      </div>
    </div>

    <!--  Footer  -->
    <FooterComponent/>
  </div>
</template>

<script lang="ts">
import FooterComponent from 'components/FooterComponent.vue';
import HeaderComponent from 'components/HeaderComponent.vue';
import { useAuthStore } from 'stores/auth';
import VideoTutorial from 'components/VideoTutorial.vue';

export default {
  name: 'HomePage',
  components: { VideoTutorial, HeaderComponent, FooterComponent },
  setup() {
    const authStore = useAuthStore();
    authStore.checkAuth()
  },
};
</script>
