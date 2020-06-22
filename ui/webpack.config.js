const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/App.jsx', //entry prop specifies the file that is the starting point from which all dependencies can be determined
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './public')
    },
    module: { //compile/transform and bundle (webpack natively is for bundling, and using babel loader is to transforming App.jsx)
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader', // webpack doesnt natively handle jsx --> need babel
            }
        ]
    }
}