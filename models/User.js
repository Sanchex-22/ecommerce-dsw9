const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');
const bcrypt        = require('bcrypt');

const User = sequelize.define('User', {
  id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:          { type: DataTypes.STRING,  allowNull: false },
  email:         { type: DataTypes.STRING,  allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING,  allowNull: false }
});

User.beforeCreate(async (user) => {
  user.password_hash = await bcrypt.hash(user.password_hash, 10);
});

User.prototype.validatePassword = function(password) {
  return bcrypt.compare(password, this.password_hash);
};

module.exports = User;
