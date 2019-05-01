'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};