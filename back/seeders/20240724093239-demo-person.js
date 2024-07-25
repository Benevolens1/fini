'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('People', [{
        name: 'Stan',
        personId: '1',
        boardId: 'a',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
