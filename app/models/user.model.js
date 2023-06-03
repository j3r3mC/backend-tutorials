const { users } = require(".");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type : Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }, 
        token:{
            type: Sequelize.STRING
        }
    });
    return User;
};