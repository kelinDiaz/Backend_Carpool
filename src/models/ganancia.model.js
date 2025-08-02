// models/ganancia.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ganancia = sequelize.define('Ganancia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  conductor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  viaje_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true  // Un viaje genera una sola ganancia
  },
  pasajeros: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_asiento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  ganancia_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'ganancias',
  timestamps: false
});

module.exports = Ganancia;
