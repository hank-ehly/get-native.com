/**
 * webpack.server.config
 * getnative.org
 *
 * Created by henryehly on 2018/02/25.
 */

const path = require('path');
const webpack = require('webpack');

const config = {
    entry: {
        server: './server.ts'
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {}
    },
    target: 'node',
    externals: [/(node_modules|main\..*\.js)/],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
        // for "WARNING Critical dependency: the request of a dependency is an expression"
        new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ), new webpack.ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, path.join(__dirname, 'src'), {})
    ]
};

const locales = ['en', 'ja'];

for (let i = 0; i < locales.length; i++) {
    config.resolve.alias[`main.server.${locales[i].toLowerCase()}`] = path.join(__dirname, 'dist', 'server', locales[i].toLowerCase(), 'main.bundle.js')
}

module.exports = config;
