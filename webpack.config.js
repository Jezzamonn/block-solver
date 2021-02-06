const path = require('path');

const client = {
    entry: './src/js/main',
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: 'main.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    stats: {
        colors: true
    },
    mode: 'development'
}

module.exports = [
    Object.assign({}, client),
];