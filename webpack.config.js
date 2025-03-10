const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/",
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@styles': path.resolve(__dirname, 'src/styles/')
        }
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        },
        {
            test: /\.html$/,
            use: [
                {loader: 'html-loader'},
            ]
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                MinicssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        }
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new MinicssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}