'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bancos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bancos.init({
    status: DataTypes.STRING,
    nome: DataTypes.STRING,
    versao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bancos',
  });
  return Bancos;
};