'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      {
        taskId: "1",
        state: "todo",
        title: "premier titre",
        content: "premier contenu",
        boardId: "a",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: "2",
        state: "todo",
        title: "deuxième titre",
        content: "deuxième contenu",
        boardId: "a",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
