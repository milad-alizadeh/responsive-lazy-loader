'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'examples'),
            'node_modules'
        ],
        extensions: ['.js', '.json']
    },
    entry: {
        app: './examples/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        publicPath: '',
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            hash: false,
            template: './examples/index.html',
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false,
                minifyJS: false,
                minifyCSS: false,
                minifyURLs: false
                // More options here
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),
        // https://webpack.js.org/plugins/commons-chunk-plugin/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // This prevents stylesheet resources with the .css or .scss extension
                // from being moved from their original chunk to the vendor chunk
                if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                    return false;
                }
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        // Required when devServer.hot = true
        new webpack.HotModuleReplacementPlugin()
    ],
    // Dev server related configs
    devServer: {
        contentBase: path.resolve(__dirname, 'examples'),
        port: 8000,
        host: 'localhost',
        open: true,
        inline: true,
        hot: true,
        noInfo: false,
        quiet: false,
        stats: 'errors-only'
    },
    devtool: '#cheap-module-eval-source-map'
};
