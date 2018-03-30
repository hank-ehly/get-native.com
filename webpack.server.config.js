/**
 * webpack.server.config
 * getnative.org
 *
 * Created by henryehly on 2018/02/25.
 */

const path = require('path');
const webpack = require('webpack');

const isStgOrPrd = ['staging', 'production'].includes(process.env.NODE_ENV);

const config = {
    entry: {
        server: isStgOrPrd ? './server.ts' : './server.dev.ts'
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

if (isStgOrPrd) {
    const locales = ['en', 'ja'];

    for (let i = 0; i < locales.length; i++) {
        const locale = locales[i].toLowerCase();
        config.resolve.alias[`main.server.${locale}`] = path.join(__dirname, 'dist', 'server', locale, 'main.bundle.js')
    }
}

module.exports = config;
