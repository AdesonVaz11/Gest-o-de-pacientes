//User.js
//Medico seu animal
const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    crm: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profissao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
})
module.exports = User