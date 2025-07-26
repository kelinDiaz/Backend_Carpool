const admiService = require('../services/admi.services');


const VerConductores = async (req,res) =>{
        try{
            const resultado = admiService.verTodoConductores();
            if (!resultado){
                return response.error(res, 400, 'No se encontro conductores');
            }
            return resultado;


        }catch(error){
        return response.error(res, 400, 'Error para ver los conductores', error);


        }


};

module.exports ={

    VerConductores
}