
const express = require('express');
const cors = require('cors');
const app = express();

const usuarioRoutes = require('./routes/usuario.routes');

const viajeRoutes = require('./routes/viaje.routes');

const campusRoutes = require('./routes/campus.routes');


const rutaRoutes = require('./routes/ruta.routes');




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/usuarios', usuarioRoutes);

app.use('/api/viajes', viajeRoutes);

app.use('/api/campus', campusRoutes);

app.use('/api/ruta', rutaRoutes);






app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

module.exports = app;
