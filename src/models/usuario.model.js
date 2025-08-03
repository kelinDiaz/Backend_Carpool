
const { sequelize } = require('../config/database');
const Rol = require('./rol.model')
const { DataTypes } = require('sequelize');



const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  apellido: { type: DataTypes.STRING(100), allowNull: false },
  dni: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  correo: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  contrasena: { type: DataTypes.STRING(255), allowNull: false },
  fotoPerfil: { type: DataTypes.STRING(255), allowNull: true },
  fotoCarnet: { type: DataTypes.STRING(255), allowNull: true },
  role_id: { type: DataTypes.INTEGER, allowNull: false },
  telefono: { type: DataTypes.STRING(20), allowNull: false },
  campus_id: {type: DataTypes.INTEGER, allowNull:false},
  estado:{type: DataTypes.STRING(25), allowNull: true, defaultValue: 'pendiente'}

}, {
  tableName: 'usuarios',
  timestamps: false
});


Rol.hasMany(Usuario, { foreignKey: 'role_id' });
Usuario.belongsTo(Rol, { foreignKey: 'role_id', as: 'Rol' });



module.exports = Usuario;
