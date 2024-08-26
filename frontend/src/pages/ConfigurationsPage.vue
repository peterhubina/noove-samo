<template>
  <div class="grid grid-rows-[auto_1fr] pt-10 px-11 gap-8">
    <h1 class="text-3xl font-medium">Created Configurations</h1>
    <div class="w-full h-full">
      <table class="w-full bg-white rounded overflow-hidden">
        <thead>
        <tr class="bg-dashboard-active">
          <th class="p-4 text-left">
            <q-checkbox v-model="selectAll" @click="markSelected"/>
            <span class="ml-4 font-medium">Configurations</span>
          </th>
          <th class="p-4 text-left">Title</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in configurations" :key="index" class="border-t">
          <td class="p-4 flex items-center">
            <q-checkbox v-model="item.selected"/>
            <div class="flex items-center ml-2">
              <img :src="item.thumbnail" alt="avatar" class="w-10 h-10 rounded-full mr-4"/>
              <div>
                <div class="font-medium">{{ item.title }}</div>
              </div>
            </div>
          </td>
          <td class="p-4">{{ item.datetime }}</td>
          <td class="p-4">
            <button @click="moreOptions" class="text-gray-500 hover:text-gray-700">...</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="w-full flex items-center justify-center p-8">
        <q-pagination
          v-model="currentPage"
          :max="configurations.length/pageConfigs"
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

<script lang="ts">
import { defineComponent, ref } from 'vue';

export interface ConfigurationItem {
  title: string
  datetime: string
  selected: boolean
  thumbnail: string
}

export default defineComponent({
  setup() {
    const configurations = ref([
      {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }, {
        title: 'Configuration 1',
        datetime: '31.8. 2024 17:56',
        selected: false,
        thumbnail: 'https://via.placeholder.com/40',
      }
    ]);
    const pageConfigs = ref<number>(8)
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(11);
    const selectAll = ref(false);

    const selectAllItems = () => {
      if (selectAll.value) {
        configurations.value.forEach((item) => {
          item.selected = true;
        })
      } else {
        configurations.value.forEach((item) => {
          item.selected = false
        })
      }
    }

    const goToPrevious = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const goToNext = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const goToPage = (page: number) => {
      currentPage.value = page;
    };

    const moreOptions = () => {
      alert('More options clicked');
    };

    return {
      configurations,
      pageConfigs,
      currentPage,
      totalPages,
      selectAll,
      markSelected: selectAllItems,
      goToPrevious,
      goToNext,
      goToPage,
      moreOptions,
    };
  },
});
</script>
