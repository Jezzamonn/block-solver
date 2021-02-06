const path = require('path');

const client = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'build/web/js'),
        filename: 'main.bundle.js'
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