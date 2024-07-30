'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subtasks', [{
      taskId: '1111',
      parentId: '1',
      content: 'sous-tâche',
      state: 'done',
      boardId: 'a',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subtasks', null, {});
  }
};
