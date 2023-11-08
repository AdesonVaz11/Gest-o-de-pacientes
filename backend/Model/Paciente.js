const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Paciente = db.define('Paciente', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    available:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

Paciente.belongsTo(User)
User.hasMany(Paciente)

module.exports = Paciente