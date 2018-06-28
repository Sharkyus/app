let Merge = require('webpack-merge');
let baseConfig = require('./webpack.base.js');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        port: 8080
    },

    plugins: [new HtmlWebpackPlugin({template: 'index.html'})]
});