'use strict';

const axios = require('axios');

module.exports = {
  async up(queryInterface, Sequelize) {
    const mangaList = require('../data/manga.json');

    const mangaData = [];
    for (const manga of mangaList) {
      const mangaDetail = await axios({
        method: 'GET',
        url: `https://api.mangadex.org/manga/${manga.id}`,
      });

      const coverArtRelationship = mangaDetail.data.data.relationships.find((relationship) => relationship.type === 'cover_art');
      const coverData = coverArtRelationship ? coverArtRelationship.id : null;

      const {data} = await axios({
        method: 'GET',
        url: `https://api.mangadex.org/cover/${coverData}`
      })

      const coverFileName = data.data.attributes.fileName

      const mangaObj = {
        mangaData: manga.id,
        mangaTitle: mangaDetail.data.data.attributes.title.en || mangaDetail.data.data.attributes.altTitles[0].en,
        description: mangaDetail.data.data.attributes.description.en,
        coverId: coverFileName,
        coverImgUrl: `http://localhost:4000/cover/${manga.id}/${coverFileName}`,
        status: manga.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mangaData.push(mangaObj);
    }

    await queryInterface.bulkInsert('Mangas', mangaData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Mangas', null, {});
  },
};
