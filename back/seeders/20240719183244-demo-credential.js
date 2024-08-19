'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Credentials', [{
      username: 'John',
      hash: '$2b$10$gpjMeI6hecl8CSNfv059G.h1j84swsG9WcTo/oBvK5303RTK3W3aS',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'admin',
      hash: '$2b$10$SqhlyEkuOWe28F4vDaV.We55pb5FjR.6fFN56EXH.92qf/x8eRyPG',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Credentials', null, {});
  }
};
