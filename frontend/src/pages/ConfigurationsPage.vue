<template>
  <div class="grid grid-rows-[auto_1fr] pt-10 px-11 gap-8">
    <h1 class="text-3xl font-medium">Created Configurations</h1>
    <div class="w-full h-full">
      <table class="w-full bg-white rounded overflow-hidden">
        <thead>
        <tr class="bg-dashboard-active">
          <th class="px-8 py-3 flex no-wrap gap-8 items-center text-left font-medium w-auto">
            <q-checkbox v-model="selectAll" @click="selectAllItems"/>
            <p>Configurations</p>
          </th>
          <th class="px-8 py-3 text-left w-80">Date</th>
          <th class="w-16"/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in paginatedConfigurations" :key="index" class="border-t border-section-div">
          <td class="px-8 py-3 flex gap-8 no-wrap items-center">
            <q-checkbox v-model="item.selected"/>
            <div class="flex no-wrap gap-4 items-center">
              <img :src="item.thumbnail" alt="avatar" class="w-10 h-10 rounded-full"/>
              <p class="font-medium">{{ item.title }}</p>
            </div>
          </td>
          <td class="px-8 py-3">{{ item.datetime }}</td>
          <td class="px-8 py-3">
            <q-btn flat round icon="download" @click="moreOptions" class="text-gray-500 hover:text-gray-700"/>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="w-full flex items-center justify-center p-8">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          :max-pages="6"
          direction-links
          boundary-numbers
          active-design="unelevated"
          size="lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface ConfigurationItem {
  title: string;
  datetime: string;
  selected: boolean;
  thumbnail: string;
}

// TODO: Configs from database
const configurations = ref<ConfigurationItem[]>([
  {
    title: 'Configuration 1',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 2',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 3',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 4',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 5',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 6',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 7',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 8',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 9',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 10',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 11',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 12',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 13',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 14',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 15',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 16',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 17',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 18',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 19',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 20',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 21',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 22',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 23',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 24',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 25',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 26',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 27',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 28',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 29',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 30',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 31',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 32',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 33',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 34',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 35',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 36',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 37',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 38',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 39',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 40',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 41',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 42',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 43',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 44',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 45',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 46',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 47',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 48',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 49',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 50',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 51',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 52',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 53',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 54',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 55',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 56',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 57',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 58',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 59',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 60',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 61',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 62',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 63',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 64',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 65',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 66',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 67',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 68',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 69',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 70',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 71',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 72',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 73',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 74',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 75',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 76',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 77',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 78',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 79',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 80',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 81',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 82',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 83',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 84',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  }, {
    title: 'Configuration 85',
    datetime: '31.8. 2024 17:56',
    selected: false,
    thumbnail: 'https://picsum.photos/40',
  },
]);

const configsPerPage = ref<number>(10);
const currentPage = ref<number>(1);
const selectAll = ref(false);

const totalPages = computed(() => {
  return Math.ceil(configurations.value.length / configsPerPage.value);
});

const paginatedConfigurations = computed(() => {
  const start = (currentPage.value - 1) * configsPerPage.value;
  const end = start + configsPerPage.value;
  return configurations.value.slice(start, end);
});

const selectAllItems = () => {
  if (selectAll.value) {
    configurations.value.forEach((item) => {
      item.selected = true;
    });
  } else {
    configurations.value.forEach((item) => {
      item.selected = false;
    });
  }
};

const moreOptions = () => {
  console.log('More options clicked');
};
</script>
