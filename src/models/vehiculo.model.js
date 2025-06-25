const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehiculo = sequelize.define('Vehiculo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false }, // corregido "llowNull" → "allowNull"
  licencia_conducir: { type: DataTypes.STRING(50), allowNull: false },
  marca: { type: DataTypes.STRING(100), allowNull: false },
  modelo: { type: DataTypes.STRING(100), allowNull: false },
  color: { type: DataTypes.STRING(50), allowNull: false },
  placa: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  foto_vehiculo: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: 'vehiculos',
  timestamps: false
});


module.exports = Vehiculo;