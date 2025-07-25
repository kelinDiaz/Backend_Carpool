const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ViajePasajero = sequelize.define('ViajePasajero', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  viaje_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pasajero_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_reserva: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'viaje_pasajero',
  timestamps: false
});

module.exports = ViajePasajero;
