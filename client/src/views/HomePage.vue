<template>
  <!-- Main Content -->
  <div class="container mx-auto px-4 mt-0 md:mt-4 lg:w-3/4">
    <MangaSlider />
    <div class="grid grid-cols-12 gap-4">
      <!-- Container B -->
      <div class="col-span-12 lg:col-span-9">
        <div class="rounded-md bg-white dark:bg-neutral-800 dark:text-gray-300">
          <div class="p-2 border-b border-slate-300 font-semibold">Latest Update</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
            <div v-for="data in mangas" :key="data.id" class="">
              <MangaCard :data="data"/>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Sidebar -->
      <div class="col-span-12 lg:col-span-3 ">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useMangaStore } from '../stores/manga'

import MangaCard from '../components/MangaCard.vue';
import MangaSlider from '../components/MangaSlider.vue';
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar,
    MangaCard,
    MangaSlider,
  },
  computed: {
    ...mapState(useMangaStore, ['mangas'])
  },
  methods: {
    ...mapActions(useMangaStore, ['fetchManga', 'fetchChapter'])
  },
  created() {
    this.fetchManga()
  }
};
</script>

<style></style>
