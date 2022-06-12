const Sequelize = require('sequelize');

const connection = require('../database/database')

const Produto = require('./Produto')

const Image = connection.define('tbl_image', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false
      }
});


Produto.hasMany(Image); 

// Image.sync({force: true});

module.exports = Image