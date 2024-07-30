'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subtask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subtask.init({
    taskId: DataTypes.STRING,
    parentId: DataTypes.STRING,
    content: DataTypes.TEXT,
    state: DataTypes.STRING,
    boardId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subtask',
  });
  return Subtask;
};