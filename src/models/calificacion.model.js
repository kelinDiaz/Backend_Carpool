const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Calificacion = sequelize.define('Calificacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  viaje_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  calificador_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  calificado_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('conductor', 'pasajero'),
    allowNull: false
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'calificaciones',
  timestamps: false
});

module.exports = Calificacion;
