const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWebpackPlugin = require('./plugin/MinaWebpackPlugin');
const MinaRuntimePlugin = require('./plugin/MinaRuntimePlugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');  // Lodash 优化
const webpack = require('webpack');
const merge = require('webpack-merge');


let config;
if (process.env.NODE_ENV === 'production') {
    config = require('./webpack.config.prod');
} else {
    config = require('./webpack.config.dev');
}


module.exports = merge({
    context: path.resolve(__dirname, 'src'),
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        globalObject: 'wx'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                include: /src/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            useRelativePath: true,
                            name: '[path][name].wxss',
                            context: path.resolve('src'),
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {}
                    }
                ],
            }
        ],
    },
    resolve: {
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@': path.resolve(__dirname, 'src/')
        }
    },
    plugins: [
        new MinaWebpackPlugin({
            scriptExtensions: ['.js'],
            assetExtensions: ['.scss'],
        }),
        new MinaRuntimePlugin(),
        new LodashWebpackPlugin(),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new CopyWebpackPlugin([
            {
                from: '**/*',
                to: './',
                ignore: ['**/*.js', '**/*.scss'],
            },
        ]),
        new webpack.EnvironmentPlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development',
            BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE) || 'debug',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [],
        usedExports: true,
        sideEffects: true,
        splitChunks: {
            chunks: 'all',
            name: 'common',
            minChunks: 2,
            minSize: 0,
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
}, config)
