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

    // 🔽 Orden correcto: Rol → Usuario → Vehiculo
    //await Rol.sync({ alter: true });
    //await Usuario.sync({ alter: true });
    //await Vehiculo.sync({ alter: true });

    
//cambio temporal


   await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

// 2. Sincronizar en orden inverso a las dependencias
await Vehiculo.sync({ force: true }); // Depende de Usuario
await Usuario.sync({ force: true });  // Depende de Rol
await Rol.sync({ force: true });      // Tabla base

// 3. Reactivar verificaciones
await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('✅ Base de datos sincronizada');
  } catch (error) {
    console.error('❌ Error al conectar o sincronizar la base de datos:', error);
  }
})();

module.exports = app;
