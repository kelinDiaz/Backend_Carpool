const sequelize = require('../config/database');

const Usuario = require('../models/usuario.model');
const Vehiculo = require('../models/vehiculo.model');
const Rol = require('../models/rol.model'); 
const Viajes = require('../models/viaje.model');
const Reserva = require('../models/reserva.model');
const { response } = require('express');

const verTodoConductores = async () =>{
    try{
        const conductores = Usuario.findAll({
      attributes: ['nombre', 'apellido', 'correo','telefono'],
      include: [{
        model: Rol,
        as: 'Rol',
        where: { nombre: 'Conductor' }, 
        attributes: [] 
      }]
    });
        if(!conductores ||  conductores.length === 0){
            return response.error(res, 400, 'No se encontro conductores');
        }
       return conductores;

    }catch(error){
        console.error(`No se encontro usuarios`, error);
        throw error;

    }
};

const verTodoPasajeros = async () =>{
    try{
        const pasajeros = Usuario.findAll({
      attributes: ['nombre', 'apellido', 'correo','telefono'],
      include: [{
        model: Rol,
        as: 'Rol',
        where: { nombre: 'Pasajero' }, 
        attributes: [] 
      }]
    });
        if(!pasajeros ||  pasajeros.length === 0){
            return response.error(res, 400, 'No se encontro pasajeros');
        }
       return pasajeros;

    }catch(error){
        console.error(`No se encontro usuarios`, error);
        throw error;

    }
};



const verInfoConductor = async (id) =>{
    try{
        const conductor = await Usuario.findOne({
      where: {  id },
      attributes: [ 'nombre', 'apellido', 'correo', 'telefono'],
      include: [{
        model: Rol,
        as: 'Rol',
        where: { nombre: 'Conductor' }, 
        attributes: []
      }],
      include: [{
        model:Vehiculo,
        where: {usuario_id: id},
        attributes: ['marca', 'modelo', 'color', 'placa']
      }]
    });
       
         if(!conductor ||  conductor.length === 0){
            return response.error(res, 400, 'No se encontro conductor');
        }
       return conductor;

    }catch(error){
         console.error(`No se encontro usuarios`, error);
        throw error;

    };



};

const verInfoPasajero = async (id) =>{
    try{
        const pasajero = await Usuario.findOne({
      where: {  id },
      attributes: [ 'nombre', 'apellido', 'correo', 'telefono'],
      include: [{
        model: Rol,
        as: 'Rol',
        where: { nombre: 'Pasajero' }, 
        attributes: []
      }]
    });
       
         if(!pasajero ||  pasajero.length === 0){
            return response.error(res, 400, 'No se encontro pasajero');
        }
       return pasajero;

    }catch(error){
         console.error(`No se encontro usuarios`, error);
        throw error;

    };
};


const verHistorialViajes = async =>{
    try{
        const viajes =  Viajes.findAll({
            attributes: ['id', 'origen', 'destino', 'estado'],
            include: [{
                model: Usuario,
                attributes: ['nombre', 'correo', 'telefono']
            }]
        });

        if(!viajes || viajes.length === 0){
            return response.error(res, 400, 'no hay viajes');
        }
        return viajes;

    }catch(error){
         console.error(`Error en viajes`, error);
        throw error;

    }

};


const verReserva =  async =>{
    try{
        const reserva = Reserva.findAll({
            attributes: ['id', 'estado', 'mensaje','viaje_id'],
            include: [{
                model:Usuario,
                attributes:['nombre', 'telefono', 'correo']
            }]
        });
        if(!reserva || reserva.length === 0){
            return response.error(res, 400, 'no hay reserva');
        }
        return reserva;

    }catch(error){
           console.error(`Error en reserva`, error);
        throw error;

    }
};


module.exports = {
    verTodoConductores,
    verTodoPasajeros,
    verInfoConductor,
    verInfoPasajero,
    verHistorialViajes,
    verReserva

}