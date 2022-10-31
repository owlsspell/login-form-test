const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('new_base', 'user', 's3kreee7', {
    host: process.env.DB_HOST || 'mysql_db',
    dialect: 'mysql',
});

module.exports = sequelize