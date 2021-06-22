const path = require('path')
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: '../client/src/index.js',
    output: {
        path: path.resolve(__dirname, '../client/public'),
        filename: 'bundle_client.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },

                }
            }, {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ]
}