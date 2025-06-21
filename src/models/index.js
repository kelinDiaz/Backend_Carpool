

const sequelize = require('../config/database');
const Rol = require('./rol.model');
const Usuario = require('./usuario.model');
const Vehiculo = require('./vehiculo.model');

// Definir asociaciones aquí, solo aquí
Usuario.belongsTo(Rol, { foreignKey: 'role_id' });
Rol.hasMany(Usuario, { foreignKey: 'role_id' });

Vehiculo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasOne(Vehiculo, { foreignKey: 'usuario_id' });

module.exports = {
  sequelize,  // <---- agrega esta línea
  Rol,
  Usuario,
  Vehiculo
};
