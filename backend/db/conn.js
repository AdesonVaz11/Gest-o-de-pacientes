//db/conn.js

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('equipe_administrativa', 'root', 'sucesso', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306 //não copiar
})

try {
    sequelize.authenticate()
    console.log('Conectado ao banco!!!!!!')
} catch (error) {
    console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize