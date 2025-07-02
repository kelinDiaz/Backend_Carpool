const bcryptjs = require('bcryptjs');
const sequelize = require('../config/database');
const Usuario = require('../models/usuario.model');
const Vehiculo = require('../models/vehiculo.model');

const crearUsuario = async (datosUsuario, datosVehiculo) => {
  const transaction = await sequelize.transaction();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    datosUsuario.contrasena = await bcryptjs.hash(datosUsuario.contrasena, salt);
    
    
    const nuevoUsuario = await Usuario.create(datosUsuario, { transaction });

    
    if (datosUsuario.role_id === 2 && datosVehiculo) {
      await Vehiculo.create({
        usuario_id: nuevoUsuario.id,
        marca: datosVehiculo.marca,
        modelo: datosVehiculo.modelo,
        color: datosVehiculo.color,
        placa: datosVehiculo.placa,
        licencia: datosVehiculo.licencia_path,
        foto_vehiculo: datosVehiculo.foto_vehiculo
      }, { transaction });
    }

    
    await transaction.commit();
    
    return {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
      role_id: nuevoUsuario.role_id
    };

  } catch (error) {
    
    if (transaction) await transaction.rollback();
    console.error('Error en crearUsuario:', error);
    
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Datos duplicados: ' + error.errors.map(e => e.path).join(', '));
    }
    
    throw new Error('Error al registrar usuario: ' + error.message);
  }
};

const verificarExistencia = async (modelo, campo, valor) => {
  try {
    const resultado = await modelo.findOne({ 
      where: { [campo]: valor },
      attributes: ['id'] 
    });
    return !!resultado;
  } catch (error) {
    console.error(`Error verificando ${campo}:`, error);
    throw error;
  }
};

const verificarDNI = async (dni) => verificarExistencia(Usuario, 'dni', dni);
const verificarCorreo = async (correo) => verificarExistencia(Usuario, 'correo', correo);
const verificarPlaca = async (placa) => verificarExistencia(Vehiculo, 'placa', placa);

const buscarUsuarioPor = async (campo, valor, excludePassword = true) => {
  try {
    return await Usuario.findOne({ 
      where: { [campo]: valor },
      attributes: excludePassword ? { exclude: ['contrasena'] } : undefined
    });
  } catch (error) {
    console.error(`Error buscando usuario por ${campo}:`, error);
    throw new Error(`Error al buscar usuario por ${campo}`);
  }
};

const buscarDNI = async (dni) => buscarUsuarioPor('dni', dni);
const buscarPlaca = async (placa) => verificarExistencia(Vehiculo, 'placa', placa);

const buscarUsuarioPorCorreo = async (correo) => {
  try {
    return await Usuario.findOne({ 
      where: { correo },
      attributes: ['id', 'nombre', 'apellido', 'correo', 'contrasena', 'role_id']
    });
  } catch (error) {
    console.error('Error en buscarUsuarioPorCorreo:', error);
    throw error;
  }
};

const login = async (correo, contrasena) => {
  try {
    const resultado = Usuario.findOne({where : { correo }});
    return resultado;

    const contrasenaValida = await bcryptjs.compare(contrasena, resultado.contrasena);
    if (!contrasenaValida) return null;



    return {
      id: resultado.id,
      nombre: resultado.nombre,
      apellido: resultado.apellido,
      correo: resultado.correo,
      role_id: resultado.role_id
    };

  } catch (error) {
    console.error('Error en login:', error);
    throw new Error('Error durante el login');
  }
};

module.exports = {
  crearUsuario,
  buscarUsuarioPorCorreo,
  login,
  buscarDNI,
  buscarPlaca,
  verificarDNI,
  verificarCorreo, 
  verificarPlaca
};