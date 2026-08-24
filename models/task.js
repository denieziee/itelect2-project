'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // GT8: each Task belongs to one User
      Task.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: 'title is required' } }
    },
    dueDate: DataTypes.DATE,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
    hooks: {
      beforeValidate: (task) => {
        if (task.title) task.title = task.title.trim();
      }
    }
  });
  return Task;
};
