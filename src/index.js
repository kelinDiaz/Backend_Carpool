

// src/index.js
const app = require('./app');
const PORT = process.env.PORT || 3000;


const Usuario = require('./models/usuario.model');
const Rol = require('./models/rol.model');
const Vehiculo = require('./models/vehiculo.model');

// Relaciones
Usuario.belongsTo(Rol, { foreignKey: 'role_id' });
Rol.hasMany(Usuario, { foreignKey: 'role_id' });



Vehiculo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Vehiculo, { foreignKey: 'usuario_id' });

module.exports = {
  Usuario,
  Rol,
  Vehiculo
};

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
