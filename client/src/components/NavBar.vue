<template>
  <div class="border-b-violet-700">
    <div class="bg-white-400 text-gray-900 dark:text-gray-300 dark:bg-[#121212]">
      <div class="container mx-auto md:w-full lg:w-3/4">
        <div class="flex items-center justify-start px-4 py-4">
          <div>
            <button class="block focus:outline-none md:hidden" @click.prevent="isOpen = !isOpen">
              <svg class="h-7 w-7 pt-1" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <a @click.prevent="$router.push('/')" class="font-semibold uppercase text-2xl cursor-pointer">DZ MANGA</a>
          </div>
          <div class="flex-1 flex justify-center sm:justify-end"></div>
          <button @click.prevent="isDark = !isDark">
            <svg v-if="!isDark" class="h-6 w-6 text-yellow-500 border rounded-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"></path>
            </svg>
            <svg v-else class="h-6 w-6 text-yellow-500 border rounded-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-violet-600 w-full md:flex opacity-90" :class="isOpen ? 'block absolute' : 'hidden'">
    <div class="container md:w-full lg:w-3/4 mx-auto z-90">
      <div class="flex flex-col justify-between md:flex-row">
        <div class="flex flex-col md:flex-row">
          <a @click.prevent="$router.push('/')" class="block px-4 py-2 md:py-3 text-white hover:text-gray-400 cursor-pointer">Home</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useDark } from '@vueuse/core';

export default {
  data() {
    return {
      isOpen: false,
      windowWidth: null,
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 768) {
        this.isOpen = false;
      }
    });
  },
  setup() {
    const isDark = useDark();
    return { isDark };
  },
};
</script>

<style></style>
