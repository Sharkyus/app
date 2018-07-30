const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

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
        extensions: ['.js','.less','.json','.vue'],
        modules: [path.join(process.cwd(), 'src'), path.join(process.cwd(), 'config'), 'node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(process.cwd(), "src"),
            '#': path.resolve(process.cwd(), "config")
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0']
                    }
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
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                }
            }
        ],
    }
};