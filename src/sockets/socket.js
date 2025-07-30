// src/sockets/socket.js
let ioInstance = null;

function initSocket(server) {
  const { Server } = require('socket.io');
  const io = new Server(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(' Nuevo cliente conectado');

    socket.on('joinUser', (usuarioId) => {
      console.log(` Usuario ${usuarioId} se unió a su room`);
      socket.join(`usuario-${usuarioId}`);
    });

    socket.on('disconnect', () => {
      console.log(' Cliente desconectado');
    });
  });

  ioInstance = io;
  return io;
}

function getIO() {
  if (!ioInstance) {
    throw new Error('Socket.io no ha sido inicializado');
  }
  return ioInstance;
}

module.exports = {
  initSocket,
  getIO
};
