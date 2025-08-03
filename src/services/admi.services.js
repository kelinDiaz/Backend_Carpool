const sequelize = require('../config/database');
const { Op } = require('sequelize');
const Usuario = require('../models/usuario.model');
const Vehiculo = require('../models/vehiculo.model');
const Rol = require('../models/rol.model'); 
const Viajes = require('../models/viaje.model');
const Reserva = require('../models/reserva.model');
const { response } = require('express');
const ViajePasajero = require('../models/viaje_pasajero.model');

const verTodoConductores = async () =>{
    try{
        const conductores = Usuario.findAll({
      attributes: ['id' ,'nombre', 'apellido', 'correo','telefono',  'dni' , 'estado'],
       where : { estado: {
          [Op.in]: ['activo', 'pendiente', 'suspendido', 'aceptado'] 
        } },
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
      attributes: ['nombre', 'apellido', 'correo','telefono' ,'id' , 'dni' , 'estado' ],
      where : { estado: {
          [Op.in]: ['activo', 'pendiente', 'suspendido', 'aceptado'] 
        } },
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
      where: {  id : id },
      attributes: [ 'nombre', 'apellido', 'correo', 'telefono' , 'id' , 'dni', 'estado' ],
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
      where: {  id : id },
      attributes: ['id', 'nombre', 'apellido', 'correo', 'telefono', 'dni', 'estado' ],
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
                as: 'conductor',
                attributes: ['nombre', 'correo', 'telefono', 'id', 'dni']
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

const eliminarPasajero = async (id) => {
    try {
         const pasajero = await Usuario.findOne({
            where: {id: id},
            include: [{
                model: Rol,
                as: 'Rol',
                where: { nombre: 'Pasajero' }, 
                attributes: []
            }]
            });

            pasajero.estado = 'inactivo';
            await pasajero.save();
            return pasajero;
        

       
    } catch (error) {
        console.error('Error al eliminar pasajero:', error);
        throw error;
    }
};

const eliminarConductor = async (id) => {
    try {
         const conductor = await Usuario.findOne({
            where: {id: id},
            include: [{
                model: Rol,
                as: 'Rol',
                where: { nombre: 'Conductor' }, 
                attributes: []
            }]
            });

            conductor.estado = 'inactivo';
            await conductor.save();
            return conductor;
        

       
    } catch (error) {
        console.error('Error al eliminar conductor:', error);
        throw error;
    }
};

const eliminarViaje = async (id) => {
    try {
        const reserva = await Reserva.findByPk(id); 

        if (!reserva) {
            return null;
        }

        await reserva.destroy();
        return reserva;

    } catch (error) {
        console.error('Error al eliminar viaje:', error);
        throw error;
    }
};

const viajeDetalleConductor = async (id) =>{
    try{
        const viaje = await Viajes.findOne({
      where: { id: id },
      attributes: ['id', 'origen', 'destino', 'estado', 'hora_salida','asientos_disponibles','precio_asiento','descripcion'],
            include: [{
                model: Usuario,
                as: 'conductor',
                attributes: ['nombre', 'correo', 'telefono', 'dni' , 'estado', 'apellido']
            }]
        });
       
         if(!viaje ||  viaje.length === 0){
            return response.error(res, 400, 'No se encontro viaje');
        }
       return viaje;

    }catch(error){
         console.error(`No se encontro informacion`, error);
        throw error;

    };
};

const viajeDetalle = async (id) =>{
    try{
        const viaje = await ViajePasajero.findAll({
      where: { viaje_id : id },
            include: [{
                model: Usuario,
                attributes: ['nombre', 'correo', 'telefono', 'dni',  'estado', 'apellido']
            }]
        });

       
         if(!viaje ||  viaje.length === 0){
            return null;
        }
       return viaje;

    }catch(error){
         console.error(`No se encontro informacion`, error);
        throw error;

    };
};

const cambiarEstado = async (id, tipoUsuario, estado) =>{
    try{
            const cambioEstado = await Usuario.findOne({
                where: {id: id},
                include: [{
                    model: Rol,
                    as: 'Rol',
                    where: {nombre: tipoUsuario}
                }]
            });

            cambioEstado.estado = estado;
            await cambioEstado.save();
            return  cambioEstado;
    }catch(error){
        console.error(`Problemas al actualizar estado`, error);
        throw error;
    }
}


const cambiarEstadoInactivo = async (id) =>{
    try{
            const cambioEstado = await Usuario.findOne({
                where: {id: id},
                
            });
            cambioEstado.estado = 'activo';
            await cambioEstado.save();
            return  cambioEstado;
    }catch(error){
        console.error(`Problemas al actualizar estado`, error);
        throw error;
    }
};


const verEstadoInactivo = async (id) =>{
    try{
            const usuarios = await Usuario.findAll({
                where: {estado: 'inactivo'},
                attributes: ['id', 'nombre','correo', 'apellido', 'dni']
            });
            return  usuarios;
    }catch(error){
        console.error(`Problemas al actualizar estado`, error);
        throw error;
    }
}


const aceptarConductor = async (id) => await cambiarEstado(id,'Conductor', 'activo');
const suspenderConductor = async (id) => await cambiarEstado(id,'Conductor', 'suspender');

const suspenderPasajero = async (id) => await cambiarEstado(id,'Pasajero', 'suspender');
const aceptarPasajero = async (id) => await cambiarEstado(id,'Pasajero', 'activo');


module.exports = {
    verTodoConductores,
    verTodoPasajeros,
    verInfoConductor,
    verInfoPasajero,
    verHistorialViajes,
    verReserva,
    eliminarPasajero,
    eliminarViaje,
    viajeDetalleConductor,
    viajeDetalle,
    eliminarConductor,
    aceptarConductor,
    suspenderConductor,
    suspenderPasajero,
    aceptarPasajero,
    cambiarEstadoInactivo ,
    verEstadoInactivo

}