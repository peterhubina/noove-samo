<template>
  <header class="flex no-wrap gap-12 sm:gap-0 justify-between items-center px-8 sm:px-20 h-20">
    <router-link to="/">
      <img src="src/assets/asseco_centraleurope_logo.svg" alt="Logo" class="max-sm:hidden sm:block">
      <img src="src/assets/asseco_ce.svg" alt="Logo" class="max-sm:block sm:hidden">
    </router-link>

    <router-link v-if="!auth" to="/login" class="rounded">
      <q-btn unelevated outline color="primary" label="Log In" class="w-max sm:px-8 rounded"/>
    </router-link>
  </header>
</template>

<script>
export default {
  props: ['auth'],
  name: 'HeaderComponent'
}
</script>
