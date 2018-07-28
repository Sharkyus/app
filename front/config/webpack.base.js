const path = require('path');

module.exports = {
    context: path.join(process.cwd(), 'src'),
    entry: [
        'babel-polyfill',
        './index.js'
    ],
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js','.less','.css','.html','.json'],
        modules: [path.join(process.cwd(), 'src'), path.join(process.cwd(), 'config'), 'node_modules'],
        alias: {
            '@': path.resolve(process.cwd(), "src"),
            '~': path.resolve(process.cwd(), "src/templates"),
            '#': path.resolve(process.cwd(), "config")
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0', 'react']
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            }
        ],
    }
};