# React + WebPack

## Dependencies
### Dependencies
* react
* react-dom

### Dev Dependencies
* @babel/core
* @babel/preset-env
* @babel/preset-react
* @babel/preset-typescript
* @types/react
* @types/react-dom
* babel-loader
* html-webpack-plugin
* ts-loader
* typescript
* webpack
* webpack-cli
* webpack-dev-server
* webpack-merge

## Webpack
### webpack.config.js

```const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    }
}
```
This is rules into JS and TS sections and use dedicated loader.
<b>The crucial point is to keep extensions in the order</b>

Than in dedicated webpack.dev and webpack.prod one might extend config by dedicated setup depending upon a stage.
