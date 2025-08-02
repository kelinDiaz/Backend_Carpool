const vehiculoServices = require('../services/vehiculo.service');

 const cFotoVehiculo = async (req, res) => {
        try {
        const { id } = req.params;

            const resultado = await vehiculoServices.verFotoVehiculo(id);
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
          console.error('Error verificando foto vehiculo:', error);
          return res.status(500).json({ available: true, message: 'Error para obtener datos' });
        }
};


 const cFotoLicencia = async (req, res) => {
        try {
        const { id } = req.params;

            const resultado = await vehiculoServices.verFotoLicencia(id);
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
          console.error('Error verificando licencia:', error);
          return res.status(500).json({ available: true, message: 'Error para obtener datos' });
        }
};

 const cFotoRevision = async (req, res) => {
        try {
        const { id } = req.params;

            const resultado = await vehiculoServices.verFotoRevision(id);
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
          console.error('Error verificando foto revision:', error);
          return res.status(500).json({ available: true, message: 'Error para obtener datos' });
        }
};


module.exports = {
 cFotoLicencia,
 cFotoRevision,
 cFotoVehiculo
};