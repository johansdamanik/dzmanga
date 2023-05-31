<template>
  <div class="rounded-md bg-white dark:bg-neutral-800">
    <div class="p-2 border-b border-slate-300 font-semibold dark:text-gray-200">Today's Pick</div>
    <div class="w-3/4 justify-between mx-auto my-6">
      <swiper
        :slidesPerView="1"
        :spaceBetween="10"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :breakpoints="{
          '640': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '768': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '1024': {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="(card, index) in mangas.slice(0, 6)" :key="index">
          <div class="flex justify-center items-center p-3 bg-white dark:bg-neutral-800 cursor-pointer">
            <div class="flex flex-col items-center text-sm" @click.prevent="handleRead(card.Chapters[0].chapterId, card.mangaTitle, card.Chapters[0].chapter)">
              <img :src="card.coverImgUrl" alt="Image" class="object-cover h-12 rounded-md mb-3" />
              <h2 class="font-bold dark:text-gray-200">{{ card.mangaTitle }}</h2>
              <p class="font-semibold mb-3 dark:text-gray-200">⭐⭐⭐⭐⭐ 5</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useMangaStore } from '../stores/manga';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  computed: {
    ...mapState(useMangaStore, ['mangas']),
  },
  methods: {
    ...mapActions(useMangaStore, ['fetchChapter', 'resetChapter']),
    handleRead(chapterId, title, ch) {
      this.resetChapter();
      const mangaTitle = title.toLowerCase().replace(/\s+/g, '-');
      this.$router.push(`/read/${mangaTitle}/${ch}/${chapterId}`);
    },
  },
};
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
