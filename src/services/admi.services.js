const sequelize = require('../config/database');

const Usuario = require('../models/usuario.model');
const Vehiculo = require('../models/vehiculo.model');
const Rol = require('../models/rol.model'); 

const verTodoConductores = async () =>{
    try{
        const conductores = Usuario.findAll({
                include :[{
                    model: Rol,
                    as: 'Rol'
                }]
        },
    {
        attributes: ['nombre', 'apellido', 'correo']
    });
       return conductores;

    }catch(error){
        console.error(`No se encontro usuarios`, error);
        throw error;

    }




}

module.exports = {
    verTodoConductores

}