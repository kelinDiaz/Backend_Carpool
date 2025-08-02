const usuarioService = require('../services/usuario.service');
const path = require('path');

const response = {
  success: (res, status, message, data = null) => {
    return res.status(status).json({
      success: true,
      message,
      ...data
    });
  },
  error: (res, status, message, errors = {}) => {
    return res.status(status).json({
      success: false,
      message,
      errors
    });
  }
};

const registrarUsuario = async (req, res) => {
  try {
    const { 
      nombre, apellido, dni, correo, contrasena, role_id, telefono, campus_id, vehiculo
    } = req.body;


     const files = req.files || {};

  
    const fotoPerfil = files.fotoPerfil || [];
    const fotoCarnet = files.fotoCarnet || [];
    const licencia_conducir = files.licencia_conducir || [];
    const fotoCarro = files.fotoCarro || [];
    const fotoRevision = files.fotoRevision || [];
    const errores = {};

    if (!nombre) errores.nombre = 'Nombre es requerido';
    if (!apellido) errores.apellido = 'Apellido es requerido';
    if (!dni) errores.dni = 'DNI es requerido';
    if (!correo) errores.correo = 'Correo es requerido';
    if (!contrasena) errores.contrasena = 'Contraseña es requerida';
    if (!telefono) errores.telefono = 'Teléfono es requerido';
    

    if (Number(role_id )== 2) {
      if (!licencia_conducir.length) errores.licencia_conducir = 'Licencia requerida';
      if(!fotoRevision.length) errores.fotoRevision = 'foto de revision requerida';
      if (!fotoCarro.length) errores.fotoCarro = 'Foto de vehículo requerida';
      if (!vehiculo) errores.vehiculo = 'Datos de vehículo requeridos';
    }

    if (Object.keys(errores).length > 0) {
      return response.error(res, 400, 'Validación fallida', errores);
    }

    let vehiculoData = null;
    if (role_id == 2 && vehiculo) {
      try {
        vehiculoData = typeof vehiculo === 'string' ? JSON.parse(vehiculo) : vehiculo;

        if (!vehiculoData.placa) errores.placa = 'Placa requerida';
        if (!vehiculoData.marca) errores.marca = 'Marca requerida';
        if (!vehiculoData.modelo) errores.modelo = 'Modelo requerido';
        if (!vehiculoData.color) errores.color = 'Color requerido';

        if (Object.keys(errores).length > 0) {
          return response.error(res, 400, 'Datos de vehículo incompletos', errores);
        }

        const placaExistente = await usuarioService.verificarPlaca(vehiculoData.placa);
        if (placaExistente) errores.placa = 'Placa ya registrada';

      } catch (e) {
        errores.vehiculo = 'Formato de vehículo inválido';
        return response.error(res, 400, 'Error en datos de vehículo', errores);
      }
    }

    const dniExistente = await usuarioService.verificarDNI(dni);
    if (dniExistente) errores.dni = 'DNI ya registrado';

    const correoExistente = await usuarioService.verificarCorreo(correo);
    if (correoExistente) errores.correo = 'Correo ya registrado';

    if (Object.keys(errores).length > 0) {
      return response.error(res, 400, 'Errores de validación', errores);
    }

    const usuarioData = {
      nombre,
      apellido,
      dni,
      correo,
      contrasena, 
      role_id,
      telefono,
      campus_id,
      fotoPerfil: fotoPerfil[0]?.path || null,
      fotoCarnet: fotoCarnet[0]?.path || null,
      
    };

    const vehiculoDataForService = Number(role_id) === 2 ? {
      marca: vehiculoData.marca,
      modelo: vehiculoData.modelo,
      color: vehiculoData.color,
      placa: vehiculoData.placa,
      fotoCarro: fotoCarro[0]?.path || null,
      licencia_conducir: licencia_conducir[0]?.path || null,
      fotoRevision: fotoRevision[0]?.path || null
    } : null;

    const nuevoUsuario = await usuarioService.crearUsuario(usuarioData, vehiculoDataForService);

    return response.success(res, 201, 'Usuario registrado exitosamente', {
      data: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        role_id: nuevoUsuario.role_id
      }
    });

  } catch (error) {
    console.error('Error en registrarUsuario:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      const campos = error.errors.map(err => err.path).join(', ');
      return response.error(res, 409, `Datos duplicados: ${campos}`);
    }

    if (error.message.includes('Datos incompletos')) {
      return response.error(res, 400, error.message);
    }

    return response.error(res, 500, 'Error interno al registrar usuario');
  }
};

const inicioSesion = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return response.error(res, 400, 'Correo y contraseña son requeridos');
    }

    const resultado = await usuarioService.login(correo, contrasena);

    return response.success(res, 200, 'Inicio de sesión exitoso', {
      usuario: resultado.usuario, 
      token: 'fake_token' 
    });

  } catch (error) {
    if (error.code === 'EMAIL_NOT_FOUND') {
      return response.error(res, 404, error.message, { correo: error.message });
    }
    if (error.code === 'INVALID_PASSWORD') {
      return response.error(res, 401, error.message, { contrasena: error.message });
    }

    console.error('Error en inicioSesion:', error);
    return response.error(res, 500, 'Error interno al iniciar sesión');
  }
};

const checkDNI = async (req, res) => {
  try {
    const { dni } = req.query;

    if (!dni) {
      return res.status(400).json({ available: false, message: 'DNI es requerido' });
    }

    const existe = await usuarioService.verificarDNI(dni);
    return res.status(200).json({
      available: !existe,
      message: existe ? 'DNI ya registrado' : 'DNI disponible'
    });

  } catch (error) {
    console.error('Error verificando DNI:', error);
    return res.status(500).json({ available: true, message: 'Error interno al verificar DNI' });
  }
};

const checkCorreo = async (req, res) => {
  try {
    const { correo } = req.query;

    if (!correo) {
      return res.status(400).json({ available: false, message: 'Correo es requerido' });
    }

    const existe = await usuarioService.verificarCorreo(correo);
    return res.status(200).json({
      available: !existe,
      message: existe ? 'Correo ya registrado' : 'Correo disponible'
    });

  } catch (error) {
    console.error('Error verificando correo:', error);
    return res.status(500).json({ available: true, message: 'Error interno al verificar correo' });
  }
};

const checkPlaca = async (req, res) => {
  try {
    const { placa } = req.query;

    if (!placa) {
      return res.status(400).json({ available: false, message: 'Placa es requerida' });
    }

    const existe = await usuarioService.verificarPlaca(placa);
    return res.status(200).json({
      available: !existe,
      message: existe ? 'Placa ya registrada' : 'Placa disponible'
    });

  } catch (error) {
    console.error('Error verificando placa:', error);
    return res.status(500).json({ available: true, message: 'Error interno al verificar placa' });
  }
};


      const actualizacion = async (req, res) =>{
          try{

              const { correo } = req.params;
              const datosUsuario = req.body;
              const respuesta = await usuarioService.actualizarDatos(correo, datosUsuario);

              if(!respuesta){
                return res.status(404).json({ message: 'Usuario no  actualizado correctamente' });
              }
               res.status(200).json({
                 message: 'Usuario actualizado correctamente'
              });

          }catch(error){
              res.status(500).json({ 
              message: 'Error en el servidor',
               error: error.message 
              });

          }


      };

       const actualizacionContra = async (req, res) =>{
          try{

              const { correo } = req.params;
              const  {contrasena}   = req.body;
              const respuesta = await usuarioService.cambiarContra(correo,contrasena);

              if(!respuesta){
                return res.status(404).json({ message: 'Contraseña no  actualizado correctamente' });
              }
               res.status(200).json({
                 message: 'Contraseña actualizado correctamente'
              });

          }catch(error){
              res.status(500).json({ 
              message: 'Error en el servidor',
               error: error.message 
              });

          }


      };

      const cFotoPerfil = async (req, res) => {
        try {
        const { id } = req.params;

            const resultado = await usuarioService.verFotoPerfil(id);
            if(resultado){

            const rutaRelativa = resultado.valor
            .replace(/\\/g, '/')
            .replace(/^.*uploads/, 'uploads');

          const url = `${req.protocol}://${req.get('host')}/${rutaRelativa}`;
              
              return res.status(200).json({ available: true, url});
            }else{
              return res.status(400).json({ available: false, message: 'No se encontro una imagen' });
            }

        } catch (error) {
          console.error('Error verificando:', error);
          return res.status(500).json({ available: true, message: 'Error para obtener datos' });
        }
};  

 const cFotoCarnet = async (req, res) => {
        try {
        const { id } = req.params;

            const resultado = await usuarioService.verFotoCarnet(id);
            if(resultado){

            const rutaRelativa = resultado.valor
            .replace(/\\/g, '/')
            .replace(/^.*uploads/, 'uploads');

          const url = `${req.protocol}://${req.get('host')}/${rutaRelativa}`;
              
              return res.status(200).json({ available: true, url});
            }else{
              return res.status(400).json({ available: false, message: 'No se encontro una imagen' });
            }

        } catch (error) {
          console.error('Error verificando placa:', error);
          return res.status(500).json({ available: true, message: 'Error para obtener datos' });
        }
};



const actualizarFotoPerfil = async (req, res) => {
              try {
                const { id } = req.params;
                if (!req.file) {
                  return res.status(400).json({ error: "No se envió la foto de perfil" });
                }
              const archivo = req.file || (req.files && req.files.fotoPerfil?.[0]);;
              console.log('archivo:', archivo);
              if (!archivo || !archivo.path) {
                  return res.status(400).json({ error: 'No se envió la foto de perfil archivo' });
                }
            const rutaRelativa = `/uploads/perfiles/${archivo.filename}`;
                const respuesta = await usuarioService.cambiarFotoPerfil(id, rutaRelativa);
                if(respuesta){
                  return res.status(200).json({ mensaje: "Foto de perfil actualizada", nombreArchivo: archivo.filename });
                }
              } catch (error) {
              console.error("Error completo en actualizarFotoPerfil:", {
                  message: error.message,
                  stack: error.stack
                });
                return res.status(500).json({ 
                  error: "Error interno al procesar la imagen",
                  detalles: error.message 
                });
              }
};


const actualizarFotoCarnet = async (req, res) => {
              try {
                const { id } = req.params;
                if (!req.file) {
                  return res.status(400).json({ error: "No se envió la foto de perfil" });
                }
              const archivo = req.file;
              console.log('archivo:', archivo);
              if (!archivo) {
                  return res.status(400).json({ error: 'No se envió la foto de perfil archivo' });
                }
            const rutaRelativa = `/uploads/carnets/${archivo.filename}`;
                const respuesta = await usuarioService.cambiarCarnet(id, rutaRelativa);
                if(respuesta){
                  return res.status(200).json({ mensaje: "Foto de carnet actualizada", nombreArchivo: archivo.filename });
                }
              } catch (error) {
              console.error("Error completo en actualizarFoto carnet:", {
                  message: error.message,
                  stack: error.stack
                });
                return res.status(500).json({ 
                  error: "Error interno al procesar la imagen",
                  detalles: error.message 
                });
              }
};



module.exports = {
  registrarUsuario,
  inicioSesion,
  checkDNI,
  checkCorreo,
  checkPlaca,
  actualizacion,
  cFotoCarnet,
  cFotoPerfil,
  actualizacionContra,
  actualizarFotoPerfil,
  actualizarFotoCarnet
};
