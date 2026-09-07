'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: 'name is required' } }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: 'email is required' } }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeValidate: (user) => {
        if (user.name) user.name = user.name.trim();
        if (user.email) user.email = user.email.trim();
      }
    }
  });
  return User;
};