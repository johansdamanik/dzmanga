import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'http://localhost:4000';
// const baseUrl = 'https://dzmanga-production.up.railway.app';

export const useMangaStore = defineStore('manga', {
  state: () => ({
    baseUrl: baseUrl,
    mangas: [],
    chapter: [],
    mangasData: [],
  }),

  actions: {
    async fetchManga() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/manga',
        });
        this.mangas = data;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchMangaData() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/allmanga'
        });
        this.mangasData = data
        console.log(this.mangasData)
      } catch (error) {
        console.log(error)
      }
    },

    async fetchChapter(chapterId) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/manga/chapter',
          params: { chapterId: chapterId },
        });
        this.chapter = data;
      } catch (error) {
        console.log(error);
      }
    },

    async resetChapter() {
      try {
        this.chapter = [];
      } catch (error) {
        console.log(error);
      }
    },

    async donationPayment(email, donation) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/midtrans-token',
          data: { email, donation },
        });

        window.snap.pay(data.token, {
          onSuccess: function(result){
            Swal.fire({
              title: 'Thank you so much for donating to our server!',
              html: '<p>Now we can pay our <s>abused</s> lovely staff ❤️</p>',
              width: 600,
              padding: '3em',
              color: '#716add',
              background: '#fff url(/images/trees.png)',
              backdrop: `
                rgba(0,0,123,0.4)
                url("https://raw.githubusercontent.com/gist/s-shivangi/7b54ec766cf446cafeb83882b590174d/raw/8957088c2e31dba6d72ce86c615cb3c7bb7f0b0c/nyan-cat.gif")
                center top
                no-repeat
              `
            })
          },
        })
      } catch (error) {
        console.log(error);
      }
    },
  },
});
