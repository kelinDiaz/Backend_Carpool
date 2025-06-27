
 const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const Vehiculo = require('../models/vehiculo.model');

const crearUsuario = async (datosUsuario, datosVehiculo) => {
  const nuevoUsuario = await Usuario.create(datosUsuario);

  if (datosVehiculo) {
    console.log("prueba de que entro a vehiculo");
    await Vehiculo.create({
      usuario_id: nuevoUsuario.id,
      ...datosVehiculo
      
      
    });
  }

  return nuevoUsuario;
};

const buscarDNI= async (dni) => {
  return await Usuario.findOne({ where: { dni } });
};

const buscarUsuarioPorCorreo = async (correo) => {
  return await Usuario.findOne({ where: { correo }, 
  attributes : ['nombre','apellido','dni','fotoPerfil','fotoCarnet','contrasena']
  });
};

const login = async (correo, contrasena) => {
  try {

      const usuarioVerificar = await buscarUsuarioPorCorreo(correo);


      const compararContra = await bcryptjs.compare(contrasena, usuarioVerificar.contrasena);

    if (compararContra){
        return {
      
      nombre: usuarioVerificar.nombre,
      apellido: usuarioVerificar.apellido,
      correo: usuarioVerificar.correo,
      fotoPerfil: usuarioVerificar.fotoPerfil,
      fotoCarnet: usuarioVerificar.fotoCarnet
      
    }; 
    }
     
    
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

module.exports = {
  crearUsuario,
  buscarUsuarioPorCorreo,
  login,
  buscarDNI
};


