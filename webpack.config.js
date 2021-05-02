const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { AngularCompilerPlugin } = require('@ngtools/webpack');


module.exports = function () {
    return {
        entry: './src/main.ts',
        output: {
            path: __dirname + '/dist',
            filename: 'app.js'
        },
        // It will resolve file names when they lack extensions like extension-less imports.
        resolve: {
            extensions: ['.ts', '.js']
        },
        // in module we add rules according to the loader package. a module is an object with rules for deciding how files are loaded.
        // In this, we configure the rules object.
        module: {
            rules: [
                { test: /\.ts$/, loader: '@ngtools/webpack' },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader" //  transpiling ES6 and above, down to ES5
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: { minimize: true }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                },
                { test: /\.ts$/, loader: 'awesome-typescript-loader' },
                //    or
                {
                    test: /\.ts$/, loaders: [{
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('src', 'tsconfig.json') }
                    }, 'angular2-template-loader']
                },
                { test: /\.css$/, loaders: 'style-loader!css-loader' },
                { test: /\.html$/, loader: 'html-loader' },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file-loader?name=assets/[name].[hash].[ext]'
                },
                {
                    test: /\.css$/, exclude: helpers.root('src', 'app'),
                    loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
                },
                { test: /\.css$/, include: helpers.root('src', 'app'), loader: 'raw-loader' },
                {
                    test: /\.(scss|sass)$/,
                    use: ['to-string-loader', {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    include: helpers.root('src', 'app')
                }
            ],
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/assets', to: 'assets' }
            ]),
            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html', // create an HTML file into this path
                output: __dirname + '/dist',
                inject: 'head'
                // filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new ScriptExtPlugin({
                defaultAttribute: 'defer'
            }),
            new AngularCompilerPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: './src/app/app.module#AppModule',
                sourceMap: true
            })

        ]
    };
}


// The --module-bind flag lets you specify loaders from the command line.
// The flag is not webpack 4 specific. It was there since version 3.
// To use babel-loader without a configuration file configure your npm scripts in package.json like so:
// "scripts": {
// "dev": "webpack --mode development --module-bind js=babel-loader",
// "build": "webpack --mode production --module-bind js=babel-loader"
// }
// And you’re ready to run the build.
