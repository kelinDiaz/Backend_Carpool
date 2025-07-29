const { Sequelize } = require('sequelize');
require('dotenv').config();
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} - ${level.toUpperCase()} - ${message}`)
  ),
  transports: [new winston.transports.Console()]
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: msg => logger.info(msg)
  }
);

const connectDB = async () => {
  try {
    logger.info('Intentando conectar a la base de datos...');
    await sequelize.authenticate();
    logger.info('Conexión exitosa a la base de datos.');
  } catch (error) {
    logger.error(`Error de conexión a la base de datos: ${error.message}`);
    throw new Error(`Error de conexión: ${error.message}`);
  }
};

module.exports = { sequelize, connectDB, logger };
