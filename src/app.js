
const express = require('express');
const cors = require('cors');
const app = express();

const path = require('path');



app.use('/uploads', express.static(path.join(__dirname, '../uploads')));




const usuarioRoutes = require('./routes/usuario.routes');

const viajeRoutes = require('./routes/viaje.routes');

const campusRoutes = require('./routes/campus.routes');


const rutaRoutes = require('./routes/ruta.routes');

const ViajePasajeroRoutes = require('./routes/viajePasajero.routes');

const reservaRoutes = require('./routes/reserva.routes');

const administradorRoutes = require('./routes/admi.router');

const roles = require('./routes/rol.router');




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/usuarios', usuarioRoutes);

app.use('/api/viajes', viajeRoutes);

app.use('/api/campus', campusRoutes);

app.use('/api/ruta', rutaRoutes);

app.use('/api/viajePasajero', ViajePasajeroRoutes);

app.use('/api/reservas', reservaRoutes);


app.use('/api/administrador', administradorRoutes);

app.use('/api/roles', roles);





app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

module.exports = app;
