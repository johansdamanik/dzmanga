<template>
  <div class="grid grid-cols-3 p-2 border-b my-2 h-42">
    <div class="col-span-1 flex justify-center items-center">
      <img :src="data.coverImgUrl" alt="Image" class="object-cover h-32 rounded-md" />
    </div>
    <div class="col-span-2 dark:text-gray-200 m-1">
      <h2 class="font-bold mb-3 text-sm">{{ limitTitle(data.mangaTitle) }}</h2>
      <div v-for="(chapter, index) in firstThreeChapters" :key="index">
        <div class="flex justify-between items-center">
          <a class="my-1 hover:text-blue-400 cursor-pointer text-sm text-gray-800 dark:text-gray-400 font-semibold" @click.prevent="handleRead(chapter.chapterId, data.mangaTitle, chapter.chapter)"> Chapter {{ chapter.chapter }} </a>
          <p class="my-1 font-thin text-xs text-gray-500">{{ chapter.createdAt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useMangaStore } from '../stores/manga';

import moment from 'moment';

export default {
  name: 'MangaCard',
  props: ['data'],
  computed: {
    firstThreeChapters() {
      const threeChapters = this.data.Chapters.slice(0, 3);
      return threeChapters.map((chapter) => {
        return {
          ...chapter,
          createdAt: moment(chapter.createdAt).fromNow(),
        };
      });
    },
  },
  methods: {
    ...mapActions(useMangaStore, ['resetChapter']),
    limitTitle(title) {
      const words = title.split(' ');
      if (words.length > 6) {
        return words.slice(0, 6).join(' ') + '...';
      }
      return title;
    },
    handleRead(chapterId, title, ch) {
      this.resetChapter();
      const mangaTitle = title.toLowerCase().replace(/\s+/g, '-');
      this.$router.push(`/read/${mangaTitle}/${ch}/${chapterId}`);
    },
  },
};
</script>

<style></style>
