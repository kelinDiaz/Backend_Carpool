
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Viaje = sequelize.define('Viaje', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  origen: { type: DataTypes.STRING(255), allowNull: false },
  destino: { type: DataTypes.STRING(255), allowNull: false },
  fecha_salida: { type: DataTypes.DATEONLY, allowNull: false },
  hora_salida: { type: DataTypes.TIME, allowNull: false },
  precio: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  plazas_disponibles: { type: DataTypes.INTEGER, allowNull: true },
 conductor_id: { type: DataTypes.INTEGER, allowNull: false },

}, {
  tableName: 'viajes',
  timestamps: false
});

module.exports = Viaje;
