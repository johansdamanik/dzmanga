'use strict';

const axios = require('axios');

module.exports = {
  async up(queryInterface, Sequelize) {
    const mangaList = require('../data/manga.json');
    const languages = ['en'];

    const chapterData = mangaList.map(async (manga, index) => {
      const resp = await axios({
        method: 'GET',
        url: `https://api.mangadex.org/manga/${manga.id}/feed`,
        params: {
          translatedLanguage: languages,
          limit: 5,
          order: {chapter: "desc"}
        }
      });

      // console.log(resp.data)

      const mangaChapters = resp.data.data.map((chapter, chapterIndex) => {
        // console.log(chapter)
        return {
          MangaId: index + 1, 
          chapter: chapter.attributes.chapter, 
          chapterId: chapter.id,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });

      return mangaChapters;
    });

    const results = await Promise.all(chapterData);
    const chapters = results.flat();

    await queryInterface.bulkInsert('Chapters', chapters);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Chapters', null, {});
  },
};
