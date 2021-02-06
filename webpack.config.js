const path = require('path');

const client = {
    entry: './src/ts/main',
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: 'main.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devtool: 'source-map',
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    stats: {
        colors: true
    },
    mode: 'development'
}

module.exports = [
    Object.assign({}, client),
];