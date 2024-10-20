'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_banco: {
        allowNull: false,
        references: {
            model: Bancos,
            key: 'id',
        },
        type: Sequelize.INTEGER
      },
      status_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mensagem: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tempo_resposta: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      jsonb_response: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('registros');
  }
};