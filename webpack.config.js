const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

function getPath(dir) {
    return path.resolve(__dirname, dir)
}


module.exports = {
    mode: 'development',
    entry: {
        main: getPath('./src/main.js'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: getPath('./src/html/template.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [{
            test: /\.(sass|css)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        }],
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: getPath('./dist'),
        },
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    output: {
        path: getPath('./dist'),
        filename: '[name].bundle.js'
    },
}