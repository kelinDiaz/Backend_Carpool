const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const Usuario = require('./usuario.model');

const Viaje = sequelize.define('Viaje', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  conductor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },


  origen: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  destino: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  hora_salida: {
    type: DataTypes.STRING(5), // formato HH:mm
    allowNull: false
  },

  asientos_disponibles: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  precio_asiento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },



estado: {
  type: DataTypes.STRING(20),
  allowNull: false,
  defaultValue: 'activo'
},

  
}, {
  tableName: 'viajes',
  timestamps: false
});

module.exports = Viaje;
