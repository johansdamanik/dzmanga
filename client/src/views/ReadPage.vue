<template>
  <p class="my-6 font-semibold text-2xl uppercase items-center flex justify-center dark:text-gray-200">{{ mangaTitle }} -  <span class="lowercase"> CH. </span>{{ chapterNumber }}</p>
  <div class="rounded-md bg-white dark:bg-neutral-800 w-screen px-2 lg:w-3/4 xl:w-2/4 md:mx-auto">
    <div class="justify-between  mb-12">
      <div v-for="image in chapter" :key="image.id" class="flex">
        <img :src="image.imgUrl" alt="" class="w-full" />
      </div>
    </div>
    <Disqus />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useMangaStore } from '../stores/manga';

import Disqus from '../components/DisqusComment.vue';

export default {
  components: {
    Disqus
  },
  computed: {
    ...mapState(useMangaStore, ['chapter']),
    mangaTitle() {
      const title = this.$route.params.mangaTitle;
      const formattedTitle = title.replace(/-/g, " ")
      return formattedTitle;
    },
    chapterNumber(){
      return this.$route.params.ch
    }
  },
  methods: {
    ...mapActions(useMangaStore, ['fetchChapter']),
  },
  created() {
    this.fetchChapter(this.$route.params.chapterId);
  },
};
</script>

<style></style>
