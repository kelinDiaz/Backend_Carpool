

const sequelize = require('../config/database');
const Rol = require('./rol.model');
const Usuario = require('./usuario.model');
const Vehiculo = require('./vehiculo.model');

Usuario.belongsTo(Rol, { foreignKey: 'role_id' });
Rol.hasMany(Usuario, { foreignKey: 'role_id' });

Vehiculo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasOne(Vehiculo, { foreignKey: 'usuario_id' });



Viaje.belongsTo(Usuario, { foreignKey: 'conductor_id' });
Usuario.hasMany(Viaje, { foreignKey: 'conductor_id' });

module.exports = {
  sequelize, 
  Rol,
  Usuario,
  Vehiculo
};
