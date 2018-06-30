module.exports = function(sequelize, DataTypes) {
    let Sequelize = require('sequelize');
    let Image = sequelize.define('Image', {
        name: {
            type: Sequelize.STRING
        },
        width: {
            type: Sequelize.INTEGER
        },
        height: {
            type: Sequelize.INTEGER
        },
        angle: {
            type: Sequelize.INTEGER
        },

    }, {
        tableName: 'image',
        timestamps: false
    });

    return Image;
};
