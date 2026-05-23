const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');
const bcrypt        = require('bcrypt');

const Store = sequelize.define('Store', {
  id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:         { type: DataTypes.STRING,  allowNull: false },
  slug:         { type: DataTypes.STRING,  allowNull: false, unique: true },
  description:  { type: DataTypes.TEXT },
  logo_url:     { type: DataTypes.STRING },
  owner_name:   { type: DataTypes.STRING,  allowNull: false },
  email:        { type: DataTypes.STRING,  allowNull: false, unique: true },
  password_hash:{ type: DataTypes.STRING,  allowNull: false },
  paypal_email: { type: DataTypes.STRING },
  status:       { type: DataTypes.ENUM('pending','active','suspended'), defaultValue: 'active' }
});

Store.beforeCreate(async (store) => {
  store.password_hash = await bcrypt.hash(store.password_hash, 10);
});

Store.prototype.validatePassword = function(password) {
  return bcrypt.compare(password, this.password_hash);
};

module.exports = Store;
