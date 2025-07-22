
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  viaje_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pasajero_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(20),
    defaultValue: 'pendiente' // 'aceptado', 'rechazado'
  },
  mensaje: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'reservas',
  timestamps: false
});

module.exports = Reserva;
