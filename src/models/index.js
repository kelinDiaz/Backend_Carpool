

const sequelize = require('../config/database');
const Campus = require('./campusUniversitario.model');
const Rol = require('./rol.model');
const Usuario = require('./usuario.model');
const Vehiculo = require('./vehiculo.model');
const Ruta = require('./ruta.model')
const Viaje = require('./viaje.model');
const Reserva = require('./reserva.model');
const ViajePasajero = require('./viaje_pasajero.model');
const Calificacion = require('./calificacion.model'); 
const Ganancia = require('./ganancia.model')


Usuario.belongsTo(Rol, { foreignKey: 'role_id' });
Rol.hasMany(Usuario, { foreignKey: 'role_id' });


Usuario.belongsTo(Campus, { foreignKey: 'campus_id' });
Campus.hasMany(Usuario, { foreignKey: 'campus_id' });

Vehiculo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasOne(Vehiculo, { foreignKey: 'usuario_id' });


Usuario.hasOne(Ruta, { foreignKey: 'usuario_id' });
Ruta.belongsTo(Usuario, { foreignKey: 'usuario_id' });



Usuario.hasMany(Viaje, { foreignKey: 'conductor_id' });
Viaje.belongsTo(Usuario, { foreignKey: 'conductor_id', as: 'conductor' });


Reserva.belongsTo(Usuario, { foreignKey: 'pasajero_id' });
Reserva.belongsTo(Viaje, { foreignKey: 'viaje_id' });


Usuario.hasMany(Reserva, { foreignKey: 'pasajero_id' });
Viaje.hasMany(Reserva, { foreignKey: 'viaje_id' });


Viaje.belongsToMany(Usuario, {
  through: ViajePasajero,
  foreignKey: 'viaje_id',
  otherKey: 'pasajero_id'
});

Usuario.belongsToMany(Viaje, {
  through: ViajePasajero,
  foreignKey: 'pasajero_id',
  otherKey: 'viaje_id'
});


Viaje.hasMany(ViajePasajero, { foreignKey: 'viaje_id' });
ViajePasajero.belongsTo(Viaje, { foreignKey: 'viaje_id' });

ViajePasajero.belongsTo(Usuario, { foreignKey: 'pasajero_id' });
Usuario.hasMany(ViajePasajero, { foreignKey: 'pasajero_id' });



Calificacion.belongsTo(Viaje, { foreignKey: 'viaje_id' });
Calificacion.belongsTo(Usuario, { as: 'calificador', foreignKey: 'calificador_id' });
Calificacion.belongsTo(Usuario, { as: 'calificado', foreignKey: 'calificado_id' });





Ganancia.belongsTo(Usuario, { foreignKey: 'conductor_id' });
Usuario.hasMany(Ganancia, { foreignKey: 'conductor_id' });

Ganancia.belongsTo(Viaje, { foreignKey: 'viaje_id' });
Viaje.hasOne(Ganancia, { foreignKey: 'viaje_id' });




module.exports = {
  sequelize, 
  Rol,
  Campus,
  Usuario,
  Vehiculo,
  Ruta,
  Viaje,
  Reserva, 
  ViajePasajero, 
  Calificacion, 
  Ganancia



};
