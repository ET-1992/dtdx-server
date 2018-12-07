const Sequelize = require('sequelize');
const db = require('../config/db');
const sequelize  =  db.sequelize;

const Category = sequelize.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    n_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = Category;