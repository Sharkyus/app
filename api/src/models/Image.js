module.exports = function(sequelize, DataTypes) {
    let Sequelize = require('sequelize');
    let Image = sequelize.define('Image', {
        name: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'image',
        timestamps: false
    });

    return Image;
};
