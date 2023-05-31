<template>
  <div class="bg-gray-100 dark:bg-[#121212] pb-12 min-h-screen">
    <NavBar />
    <RouterView />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { mapState, mapActions } from 'pinia';
import { useMangaStore } from './stores/manga'

export default {
  components: {
    NavBar,
  },
  methods: {
    ...mapActions(useMangaStore, ['fetchMangaData'])
  },
  created() {
    this.fetchMangaData();
  }
};
</script>

<style></style>
