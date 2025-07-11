
const app = require('./app');
const sequelize = require('./config/database');


require('./models/rol.model');
require('./models/campusUniversitario.model');
require('./models/usuario.model');
require('./models/vehiculo.model')
require('./models/ruta.model')

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a BD establecida');
    return sequelize.sync({alter: true});
  })
  .then(() => {
    console.log('Modelos sincronizados');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });
