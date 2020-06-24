const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    //entry: './src/App.jsx', //entry prop specifies the file that is the starting point from which all dependencies can be determined
    //entry: { app: './src/App.jsx' }, //chunk named as 'app'
    entry: { app: ['./src/App.jsx'] }, // "multi-main entry" when injecting multiple dependent files together and graph their dependencies into one "chunk".
    output: {
        filename: '[name].bundle.js', //[name] will be replaced by the chunk's name, i.e, app
        path: path.resolve(__dirname, './public')
    },
    module: { //compile/transform and bundle (webpack natively is for bundling, and using babel loader is to transforming App.jsx)
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader', // webpack doesnt natively handle jsx --> need babel
                exclude: /node_modules/,
            }
        ]
    },
    optimization: {
        splitChunks: { //seperates everything under node_modules into a different bundle
            name: 'vendor', //that new bundle will be named as 'vendor'
            chunks: 'all'
        }
    },
    devtool: 'source-map',
    // plugins: [
    //     new webpack.DefinePlugin({ //allows to create global constants which can be configured at compile time.
    //         _API_ENDPOINT_: JSON.stringify('http://localhost:8000/graphql'), 
    //     })
    // ]

}