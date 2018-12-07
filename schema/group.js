const Sequelize = require('sequelize');
const db = require('../config/db');
const sequelize  =  db.sequelize;

const Group = sequelize.define('group', {
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
    }
});

module.exports = Group;