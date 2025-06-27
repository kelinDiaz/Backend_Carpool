const express = require('express');
const app = express();
const sequelize = require('./config/database');

// Middleware para JSON
app.use(express.json());

// Rutas
const rutasUsuarios = require('./routes/usuario.routes');
app.use('/api', rutasUsuarios);

// Importar modelos y relaciones
const { Rol, Usuario, Vehiculo } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la base de datos');

    
    await Rol.sync({ alter: true });
    await Usuario.sync({ alter: true });
    await Vehiculo.sync({ alter: true });

    



   

    console.log('✅ Base de datos sincronizada');
  } catch (error) {
    console.error('❌ Error al conectar o sincronizar la base de datos:', error);
  }
})();

module.exports = app;
