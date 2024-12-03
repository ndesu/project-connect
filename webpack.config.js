const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        // path: path.resolve(__dirname, 'static'),
        path: __dirname + '/public/',
        // path: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Match CSS files
                use: ["style-loader", "css-loader"], // Use style-loader and css-loader
            },
            {
                test: /\.js$/,
                // test: /jsx?$/,
                include: [
                    path.resolve(__dirname, 'client')
                ],
                use: ['babel-loader'],
            },
        ]
    },
};


// https://ephemera.medium.com/using-react-with-flask-without-create-react-app-eb81edb641b8