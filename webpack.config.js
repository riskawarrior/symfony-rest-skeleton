const path = require('path');
const webpack = require('webpack');
const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

let CopyWebpackPlugin = require('copy-webpack-plugin');


let config = {
    entry: {
        app: './web/assets/js/app.js'
    },
    output: {
        filename: 'js/bundle.js',
        path: 'web/',
        publicPath: '/'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.(scss|css)$/, loaders: ["style", "css", "sass"], exclude: /node_modules/},
            {test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader'},
            {test: /\.jpe?g$/, loader: 'file'}
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./web/assets/sass")]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './web/assets/images', to: 'images' }
        ]),
        new CopyWebpackPlugin([
            { from: './web/assets/vendor/bootstrap-sass/assets/fonts/bootstrap', to: 'fonts' }
        ]),
        new webpack.DefinePlugin({
            'baseURL': JSON.stringify(devBuild ? '/app_dev.php' : ''),
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv)
            }
        })
    ]
};

if (devBuild) {
    config.devtool = '#eval-source-map';
    console.log('Webpack dev build');
} else {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        })
    );
    config.plugins.push(
        new webpack.optimize.DedupePlugin()
    );
    console.log('Webpack production build');
}

module.exports = config;