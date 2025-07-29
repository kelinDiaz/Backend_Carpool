const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const Rol = sequelize.define('Rol', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true }
}, {
  tableName: 'roles',
  timestamps: false
});

module.exports = Rol;
