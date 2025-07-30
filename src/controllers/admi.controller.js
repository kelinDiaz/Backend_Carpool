const admiService = require('../services/admi.services');

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


const VerConductores = async (req, res) =>{
        try{
            const resultado = await admiService.verTodoConductores();
            if (!resultado){
                return response.error(res, 400, 'No se encontro conductores');
            }
            return response.success(res, 200, 'Conductores encontrados', resultado);


        }catch(error){
        return response.error(res, 400, 'Error para ver los conductores', error);


        }


};
const VerPasajeros = async (req, res) =>{
        try{
            const resultado = await admiService.verTodoPasajeros();
            if (!resultado){
                return response.error(res, 400, 'No se encontro pasajero');
            }
            return response.success(res, 200, 'Pasajero encontrado', resultado);


        }catch(error){
        return response.error(res, 400, 'Error para ver los pasajero', error);


        }


};

const verInfoConductor = async (req,res) =>{
    const { id } = req.params;
        try{
            
            const resultado = await admiService.verInfoConductor(id);
            
             if (!resultado){
                return response.error(res, 400, 'No hay  conductor con ese id');
            }
                const conductorLimpio = resultado.toJSON();
            
            return response.success(res, 200, 'Conductor encontrado', conductorLimpio);


        }catch(error){
               res.status(500).json({ 
              message: 'Error en el servidor',
               error: error.message 
              });
        }
};

const verInfoPasajero = async (req,res) =>{
    const { id } = req.params;
        try{
            
            const resultado = await admiService.verInfoPasajero(id);
            
             if (!resultado){
                return response.error(res, 400, 'No hay  pasajero con ese id');
            }
                const pasajeroLimpio = resultado.toJSON();
            
            return response.success(res, 200, 'pasajero encontrado', pasajeroLimpio);


        }catch(error){
               res.status(500).json({ 
              message: 'Error en el servidor',
               error: error.message 
              });
        }
};


const VerHistorialViaje = async (req, res) =>{
    try{
        const resultado =  await admiService.verHistorialViajes();
            
        if(!resultado){
                return response.error(res, 400, 'No existen viajes');
        }
        return response.success(res, 200, 'Historial de viajes', resultado);
    }catch(error){
        res.status(500).json({ 
              message: 'Error en el servidor',
               error: error.message 
              });

    }

};

const VerHistorialReserva = async (req, res) =>{
    try{
        const resultado =  await admiService.verReserva();
            
        if(!resultado){
                return response.error(res, 400, 'No existen reserva');
        }
        return response.success(res, 200, 'Historial de reserva', resultado);
    }catch(error){
        res.status(500).json({ 
              message: 'Error en el servidor',
               error: error.message 
              });

    }

};

const eliminarPasajero = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await admiService.eliminarPasajero(id);

        if (!eliminado) {
            return response.error(res, 404, 'Pasajero no encontrado o ya eliminado');
        }

        return response.success(res, 200, 'Pasajero eliminado correctamente', eliminado);
    } catch (error) {
        return response.error(res, 400, 'Error al eliminar pasajero', error);
    }
};

const eliminarViaje = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await admiService.eliminarViaje(id);

        if (!eliminado) {
            return response.error(res, 404, 'Viaje no encontrado o ya eliminado');
        }

        return response.success(res, 200, 'Viaje eliminado correctamente', eliminado);
    } catch (error) {
        return response.error(res, 400, 'Error al eliminar viaje', error);
    }
};


module.exports ={

    VerConductores,
    VerPasajeros,
    verInfoConductor,
    verInfoPasajero,
    VerHistorialViaje,
    VerHistorialReserva,
    eliminarPasajero,
    eliminarViaje

}