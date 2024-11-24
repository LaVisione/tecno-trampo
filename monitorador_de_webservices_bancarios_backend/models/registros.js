'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class registros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  registros.init({
    id_banco: DataTypes.INTEGER,
    status_code: DataTypes.STRING,
    mensagem: DataTypes.STRING,
    tempo_resposta: DataTypes.DOUBLE,
    jsonb_response: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'registros',
  });
  return registros;
};