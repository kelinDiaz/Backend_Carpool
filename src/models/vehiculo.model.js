const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehiculo = sequelize.define('Vehiculo', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  usuario_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  licencia_conducir: { 
    type: DataTypes.STRING(255), 
    allowNull: false,
    validate: {
      notNull: {
        msg: 'La licencia de conducir es obligatoria'
      },
      notEmpty: {
        msg: 'La licencia de conducir no puede estar vacía'
      }
    }
  },
  marca: { 
    type: DataTypes.STRING(100), 
    allowNull: false,
    validate: {
      notNull: {
        msg: 'La marca es obligatoria'
      }
    }
  },
  modelo: { 
    type: DataTypes.STRING(100), 
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El modelo es obligatorio'
      }
    }
  },
  color: { 
    type: DataTypes.STRING(50), 
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El color es obligatorio'
      }
    }
  },
  placa: { 
    type: DataTypes.STRING(20), 
    allowNull: false, 
    unique: true,
    validate: {
      notNull: {
        msg: 'La placa es obligatoria'
      },
      is: {
        args: /^[A-Z]{3}-\d{4}$/,
        msg: 'La placa debe tener formato ABC-1234'
      }
    }
  },
  foto_vehiculo: { 
    type: DataTypes.STRING(255), 
    allowNull: true 
  }
}, {
  tableName: 'vehiculos',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['placa']
    },
    {
      fields: ['usuario_id']
    }
  ]
});

module.exports = Vehiculo;