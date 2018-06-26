const path = require('path');

module.exports = {
    mode: 'development',
    context: path.join(process.cwd(), 'src'),
    devtool: 'source-map',
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
        extensions: ['.js','.less','.css','.html'],
        modules: [path.join(process.cwd(), 'src'), 'node_modules'],
        alias: {
            '@': path.resolve(process.cwd(), "src"),
            '~': path.resolve(process.cwd(), "src/templates")
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0']
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