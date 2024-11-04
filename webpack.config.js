const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'client')
                ],
                use: ['babel-loader'],
            },
        ]
    },
};


// https://ephemera.medium.com/using-react-with-flask-without-create-react-app-eb81edb641b8