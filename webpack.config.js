'use strict';

require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.json']
    },
    entry: './src/js/index.js',
    // Don't include them into library build
    externals: [],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'responsize-lazy-loader.min.js',
        library: 'responsize-lazy-loader.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')(),
                                    require('postcss-encode-background-svgs')()
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new ExtractTextPlugin('responsize-lazy-loader.min.css')
    ],
    devtool: false,
    performance: {
        hints: false
    }
};
