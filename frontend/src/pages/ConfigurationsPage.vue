<template>
  <div class="grid grid-rows-[auto_1fr] pt-10 px-11 gap-8">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-medium">Created Configurations</h1>
      <div class="relative">
        <q-input filled debounce="500"
                 color="primary" bg-color="white" class="border-primary" v-model="searchQuery"
                 placeholder="Search configuration...">
          <template v-slot:prepend>
            <q-icon v-if="searchQuery === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="searchQuery = ''"/>
          </template>
        </q-input>
      </div>
    </div>
    <div class="flex flex-col justify-between w-full h-full">
      <table class="w-full bg-white rounded overflow-hidden">
        <thead>
        <tr class="bg-dashboard-active">
          <th @click="changeSorting('title')"
              class="hover:bg-primary/5 transition cursor-pointer px-8 py-3 flex no-wrap gap-8 items-center text-left font-medium w-auto">
            <q-checkbox v-model="selectAll" @click="selectAllItems"/>
            <p>
              Configurations
              <i :class="getSortIconClass('title')" class="pl-2"></i>
            </p>
          </th>
          <th @click="changeSorting('datetime')"
              class="hover:bg-primary/5 transition px-8 py-3 text-left w-80 cursor-pointer">
            Date
            <i :class="getSortIconClass('datetime')" class="pl-2"></i>
          </th>
          <th class="w-16">
            <q-btn v-if="anySelected" flat round icon="delete" class="text-red-500 hover:text-red-700"
                   @click="deleteSelected"/>
          </th>
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
        <tr v-if="filteredConfigurations.length === 0">
          <td colspan="3" class="text-center py-4">
            No configurations found.
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
  }
]);

const configsPerPage = ref<number>(6);
const currentPage = ref<number>(1);
const selectAll = ref(false);
const searchQuery = ref<string>('');

const sortKey = ref<'title' | 'datetime' | ''>(''); // Empty string for no sorting initially
const sortAsc = ref(true);

const totalPages = computed(() => {
  return Math.ceil(filteredConfigurations.value.length / configsPerPage.value);
});

// Function to sort configurations
const sortConfigurations = () => {
  configurations.value.sort((a, b) => {
    const modifier = sortAsc.value ? 1 : -1;
    const sortKeyValue = sortKey.value as keyof ConfigurationItem;
    if (a[sortKeyValue] < b[sortKeyValue]) return -1 * modifier;
    if (a[sortKeyValue] > b[sortKeyValue]) return 1 * modifier;
    return 0;
  });
};

const paginatedConfigurations = computed(() => {
  // First, apply sorting if any
  sortConfigurations();

  // Then, slice the sorted array for pagination
  const start = (currentPage.value - 1) * configsPerPage.value;
  const end = start + configsPerPage.value;
  return filteredConfigurations.value.slice(start, end);
});

// Computed property for filtered and paginated configurations
const filteredConfigurations = computed(() => {
  if (!searchQuery.value) {
    return configurations.value;
  }
  return configurations.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Method to change sorting key and order
const changeSorting = (key: 'title' | 'datetime') => {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
  sortConfigurations(); // Apply sorting when key changes
};

const getSortIconClass = (key: 'title' | 'datetime') => {
  if (sortKey.value === key) {
    return sortAsc.value ? 'fas fa-caret-up' : 'fas fa-caret-down';
  }
  return 'fas fa-sort';
};

const selectAllItems = () => {
  configurations.value.forEach((item) => {
    item.selected = selectAll.value;
  });
};

const deleteSelected = () => {
  configurations.value = configurations.value.filter((item) => !item.selected);
  selectAll.value = false;
};

const anySelected = computed(() => {
  return configurations.value.some((item) => item.selected);
});

const moreOptions = () => {
  console.log('More options clicked');
};
</script>
