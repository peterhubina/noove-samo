<template>
  <q-item clickable :to="link" active-class="bg-dashboard-active font-medium active-link" class="rounded">
    <q-item-section v-if="icon" avatar>
      <img :src="icon" alt="icon">
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-base">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EssentialLink'
});

export interface EssentialLinkProps {
  id: number;
  title: string;
  link: string;
  active: boolean;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  link: '#',
  icon: ''
});
</script>
