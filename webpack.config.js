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
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i, // Match image files
                type: 'asset/resource', // Use asset module for handling files
                generator: {
                    filename: 'images/[name][ext]', // Output images to 'images' folder with hashed names
                },
            },
        ]
    },
};


// https://ephemera.medium.com/using-react-with-flask-without-create-react-app-eb81edb641b8