let Merge = require('webpack-merge');
let baseConfig = require('./webpack.base.js');
const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 8080,
        host: '0.0.0.0'
    },

    plugins: [new HtmlWebpackPlugin({template: 'index.html'})]
});