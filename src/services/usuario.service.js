const bcryptjs = require('bcryptjs');
const sequelize = require('../config/database');
const Usuario = require('../models/usuario.model');
const Vehiculo = require('../models/vehiculo.model');
const Rol = require('../models/rol.model'); 
const path = require('path');

const crearUsuario = async (datosUsuario, datosVehiculo) => {
  const transaction = await sequelize.transaction();

  try {
    const salt = await bcryptjs.genSalt(10);
    datosUsuario.contrasena = await bcryptjs.hash(datosUsuario.contrasena, salt);
    
    const nuevoUsuario = await Usuario.create(datosUsuario, { transaction });

    if (Number(datosUsuario.role_id) === 2 && datosVehiculo) {
      await Vehiculo.create({
        usuario_id: nuevoUsuario.id,
        marca: datosVehiculo.marca,
        modelo: datosVehiculo.modelo,
        color: datosVehiculo.color,
        placa: datosVehiculo.placa,
        licencia_conducir: datosVehiculo.licencia_conducir,
        fotoCarro: datosVehiculo.fotoCarro,
        fotoRevision:datosVehiculo.fotoRevision
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
      attributes: ['id', 'nombre', 'apellido', 'correo', 'contrasena', 'role_id', 'telefono'],
      include: [{
        model: Rol,
        as: 'Rol',
        attributes: ['nombre']
      }]
    });
  } catch (error) {
    console.error('Error en buscarUsuarioPorCorreo:', error);
    throw error;
  }
};

const login = async (correo, contrasena) => {
  try {
    const usuario = await buscarUsuarioPorCorreo(correo);
    if (!usuario) {
      const error = new Error('Correo no registrado');
      error.code = 'EMAIL_NOT_FOUND';
      throw error;
    }

    const contrasenaValida = await bcryptjs.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      const error = new Error('Contraseña incorrecta');
      error.code = 'INVALID_PASSWORD'; 
      throw error;
    }

    return { usuario };

  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

const actualizarDatos = async (correo, actualizacion) => {
  try {
    if (!actualizacion || Object.keys(actualizacion).length === 0) {
      return {
        success: false,
        message: 'No se proporcionaron datos para actualizar'
      };
    }

    const buscarUsuario = await buscarUsuarioPorCorreo(correo);
    if (!buscarUsuario) {
      return { success: false, message: 'Actualización no completada' };
    }

    const confirmacion = await Usuario.update(actualizacion, {
      where: { correo: correo }
    });

    if (!confirmacion) {
      return { success: false, message: 'Actualización no completada' };
    }

    return { success: true, message: 'Actualización completada' };
  } catch (error) {
    console.error('Error en actualizarDatos:', error);
    throw error;
  }
};

    const cargarFoto = async (modelo, campo, id) => {
  try {
    const resultado = await modelo.findOne({
      where: { id: id }
    });

    if (!resultado) {
      throw new Error(`No se encontró el registro con id: ${id}`);
    }

    return {
      valor: resultado[campo] 
    };
  } catch (error) {
    console.error(`Error cargando campo ${campo}:`, error);
    throw error;
  }
};

const verFotoPerfil = async (id) => await cargarFoto(Usuario, 'fotoPerfil', id);
const verFotoCarnet = async (id) => await cargarFoto(Usuario, 'fotoCarnet', id);
const verFotoVehiculo = async (id) => await cargarFoto(Vehiculo, 'foto_vehiculo', id);


  const encriptarContra = async(contra) =>{
        try {
              const salt = await bcryptjs.genSalt(10);
 
            return await bcryptjs.hash(contra, salt);


        }catch(error){
            console.error('Error en encriptar contraseña:', error);
            throw error;
        }


};

const cambiarContra = async (correo, contra) =>{
  try{
      if (!contra || Object.keys(contra).length == 0)
        return { 
                success: false, 
                message: 'No se proporcionaron datos para actualizar' 
            };

            if (!correo || !contra) {
            return { success: false, message: 'Correo y contraseña son requeridos' };
        }

        if (contra.length < 8) {
            return { success: false, message: 'La contraseña debe tener al menos 8 caracteres' };
        }

        const contraStr = String(contra);
      const contraValida = await encriptarContra(contraStr);
      const confirmacion =  await Usuario.update({contrasena: contraValida}, { where: { correo: correo }  })

      if(!confirmacion){
         return { success: false, message: 'No se pudo actualizar' };
      }
      return { success: true, message: ' se pudo actualizar' };
     
  }catch(error){
      console.error('Error en actualizar contraseña:', error);
          throw error;

  }

}; 

const cambiarFotoPerfil = async (id, rutaRelativa) =>{
  try{
   return await Usuario.update(
   {fotoPerfil: rutaRelativa}, { where: { id: id }  }
  );
     
  }catch(error){
      console.error('Error en actualizar foto perfil:', error);
          throw error;

  }

}; 

const cambiarCarnet = async (id, rutaRelativa) =>{
        try{
        return await Usuario.update(
        {fotoCarnet: rutaRelativa}, { where: { id: id }  }
        );
          
        }catch(error){
            console.error('Error en actualizar foto perfil:', error);
                throw error;

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
  verificarPlaca,
  actualizarDatos,
  verFotoCarnet,
  verFotoPerfil,
  verFotoVehiculo,
  cambiarContra,
  cambiarFotoPerfil,
  cambiarCarnet
};
