const Sequelize = require('sequelize');
const db = require('../config/db');
const sequelize  =  db.sequelize;

const Image = sequelize.define('image', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = Image;