

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Campus = sequelize.define('Campus', {
  id: { type: DataTypes.INTEGER, primaryKey: true,  autoIncrement: true },

  nombre: { type: DataTypes.STRING(50), allowNull: false,},

  direccion: {type: DataTypes.STRING(255), allowNull: false,}
}, {
  tableName: 'campus',
  timestamps: false
});

module.exports = Campus;