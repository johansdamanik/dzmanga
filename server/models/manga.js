'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Manga.hasMany(models.Chapter, {foreignKey: 'MangaId'})
    }
  }
  Manga.init({
    mangaData: DataTypes.STRING,
    mangaTitle: DataTypes.STRING,
    description: DataTypes.STRING,
    coverId: DataTypes.STRING,
    coverImgUrl: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Manga',
  });
  return Manga;
};