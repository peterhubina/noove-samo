<template>
  <aside class="w-64 flex flex-col gap-6 bg-white items-center pt-14">
    <router-link to="/">
      <img src="../assets/logo/asseco_ce.svg" alt="Logo" class="h-4">
    </router-link>

    <router-link to="/dashboard/profile">
      <q-btn unelevated color="primary" round class="size-12 flex justify-center items-center">
        <img src="../assets/icon/profile.svg" alt="Profile">
      </q-btn>
    </router-link>

    <q-list class="w-full px-4">
      <EssentialLink
        v-for="link in links"
        :id="link.id"
        :key="link.id"
        :title="link.title"
        :icon="link.icon"
        :link="link.link"
        :active="link.active"
      />
    </q-list>
  </aside>
</template>

<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const links = [
  { id: 1, title: 'Create', icon: '/src/assets/icon/create.svg', link: '/dashboard/create', active: true },
  {
    id: 2,
    title: 'Configurations',
    icon: '/src/assets/icon/configs.svg',
    link: '/dashboard/configurations',
    active: false
  },
  { id: 3, title: 'How to use', icon: '/src/assets/icon/info.svg', link: '/dashboard/how-to-use', active: false },
]
</script>
