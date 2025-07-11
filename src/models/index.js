

const sequelize = require('../config/database');
const Campus = require('./campusUniversitario.model');
const Rol = require('./rol.model');
const Usuario = require('./usuario.model');
const Vehiculo = require('./vehiculo.model');
const Viaje = require('./viaje.model');
const Ruta = require('./ruta.model')


Usuario.belongsTo(Rol, { foreignKey: 'role_id' });
Rol.hasMany(Usuario, { foreignKey: 'role_id' });



Usuario.belongsTo(Campus, { foreignKey: 'campus_id' });
Campus.hasMany(Usuario, { foreignKey: 'campus_id' });

Vehiculo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasOne(Vehiculo, { foreignKey: 'usuario_id' });


Usuario.hasOne(Ruta, { foreignKey: 'usuario_id' });
Ruta.belongsTo(Usuario, { foreignKey: 'usuario_id' });


Viaje.belongsTo(Usuario, { foreignKey: 'conductor_id' });
Usuario.hasMany(Viaje, { foreignKey: 'conductor_id' });



module.exports = {
  sequelize, 
  Rol,
  Campus,
  Usuario,
  Vehiculo,
  Viaje



};
