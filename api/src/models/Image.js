module.exports = function(sequelize, DataTypes) {
    let Sequelize = require('sequelize');
    return sequelize.define('Image', {
        name: {
            type: Sequelize.STRING
        },
        rotate: {
            type: Sequelize.INTEGER
        },

    }, {
        tableName: 'image',
        timestamps: false
    });
};
