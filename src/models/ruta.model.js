
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ruta = sequelize.define('Ruta', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  usuario_id: { type: DataTypes.INTEGER, allowNull: false },

  direccion_casa: { type: DataTypes.STRING(255), allowNull: false },
  direccion_campus: { type: DataTypes.STRING(255), allowNull: false },

  latitud_casa: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
  longitud_casa: { type: DataTypes.DECIMAL(11, 8), allowNull: true },

  latitud_campus: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
  longitud_campus: { type: DataTypes.DECIMAL(11, 8), allowNull: true }

}, {
  tableName: 'rutas',
  timestamps: false
});

module.exports = Ruta;
