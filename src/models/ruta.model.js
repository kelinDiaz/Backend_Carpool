
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ruta = sequelize.define('Ruta', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  usuario_id: { type: DataTypes.INTEGER, allowNull: false },

  direccion_casa: { type: DataTypes.STRING(255), allowNull: false },
  latitud_casa: { type: DataTypes.FLOAT, allowNull: true },
  longitud_casa: { type: DataTypes.FLOAT, allowNull: true },

  direccion_campus: { type: DataTypes.STRING(255), allowNull: false },
  latitud_campus: { type: DataTypes.FLOAT, allowNull: true },
  longitud_campus: { type: DataTypes.FLOAT, allowNull: true },

  fecha_ultima_ubicacion: { type: DataTypes.DATE, allowNull: true },

  solicitud_cambio_ruta: { type: DataTypes.BOOLEAN, allowNull: true }

}, {
  tableName: 'rutas',
  timestamps: false
});

module.exports = Ruta;
