
const http = require('http');
const app = require('./app');
const { sequelize} = require('./config/database');


require('./models/rol.model');
require('./models/campusUniversitario.model');
require('./models/usuario.model');
require('./models/vehiculo.model');
require('./models/ruta.model');
require ('./models/viaje.model')

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a BD establecida');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados');

    initSocket(server);
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });