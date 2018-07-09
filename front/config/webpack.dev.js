let Merge = require('webpack-merge');
let baseConfig = require('./webpack.base.js');
let config = require('./dev.json');
const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: config.port,
        host: config.host
    },

    plugins: [new HtmlWebpackPlugin({template: 'index.html'})]
});