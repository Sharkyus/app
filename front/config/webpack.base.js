const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    context: path.join(__dirname, 'src'),
    devtool: 'source-map',
    entry: {
        app: './index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            '@': path.resolve(__dirname, "..", "src"),
            '~': path.resolve(__dirname, "..", "src/templates")
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
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            }
        ],
    },

    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        port: 8080
    },

    plugins: [new HtmlWebpackPlugin({ template: 'index.html' })]
};