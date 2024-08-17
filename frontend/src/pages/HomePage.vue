<template>
  <div class="min-h-dvh grid" style="grid-template-rows: auto 1fr auto">
    <!--  Header  -->
    <HeaderComponent :auth="true"/>

    <!--  Main Content  -->
    <div class="flex h-full w-full justify-center items-center">
      <div
        class="grid xl:grid-cols-2 gap-10 sm:gap-14 h-full p-8 sm:p-20 xl:p-0 xl:pl-20 xl:pr-0 items-center justify-items-center overflow-hidden">
        <div class="">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold pb-6 lg:pb-10 text-balance">
            Začnite s konfiguráciou svojho firemného softvéru
          </h1>
          <p class="font-light text-balance sm:text-base xl:text-lg">
            Vitajte v SAMO platforme, kde si môžete jednoducho vytvoriť konfiguráciu presne podľa potrieb vašej firmy.
            Stačí pár kliknutí a získate plne prispôsobené riešenie, ktoré podporí rast vášho podnikania a zlepší vaše
            každodenné procesy. Naša automatizovaná platforma zaistí, že vaše riešenie bude pripravené na použitie v
            priebehu niekoľkých minút.
            <br><br>Kliknite na "Create Configuration" a začnite ešte dnes.
          </p>
          <router-link to="/dashboard">
            <q-btn unelevated no-caps color="primary" label="Create Configuration"
                   class="w-full sm:w-auto py-4 px-12 text-lg lg:text-xl xl:text-2xl mt-10 lg:mt-14 xl:mt-[4.5rem] rounded"/>
          </router-link>
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

<script lang="ts">
import FooterComponent from 'components/FooterComponent.vue';
import HeaderComponent from 'components/HeaderComponent.vue';
import { useAuthStore } from 'stores/auth';

export default {
  name: 'HomePage',
  components: { HeaderComponent, FooterComponent },
  setup() {
    const authStore = useAuthStore();
    authStore.checkAuth()
  },
};
</script>
