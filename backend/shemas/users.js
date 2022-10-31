const { Sequelize, DataTypes, Model } = require('sequelize');
// const sequelize = new Sequelize('mysql::memory:');
const sequelize = require('../config');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: "users",
});

module.exports = User;