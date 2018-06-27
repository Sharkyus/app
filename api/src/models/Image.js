module.exports = function(sequelize, DataTypes) {
    let Sequelize = require('sequelize');
    let Image = sequelize.define('Image', {
        iso_name: {
            type: Sequelize.STRING
        },
        lat: {
            type: Sequelize.FLOAT
        },
        lng: {
            type: Sequelize.FLOAT
        },
        geo_source_id: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: 'image',
        timestamps: false
    });

    return Image;
};
