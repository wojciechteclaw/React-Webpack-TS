# React + WebPack

## Dependencies
### Dependencies
* react
* react-dom
* worker-plugin

### Dev Dependencies
* @babel/core
* @babel/preset-env
* @babel/preset-react
* @babel/preset-typescript
* @types/react
* @types/react-dom
* babel-loader
* css-loader
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
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    }
}
```
This is rules into JS and TS sections and uses a dedicated loader.
<b>The crucial point is to keep extensions in the order</b>

Then in dedicated webpack.dev and webpack.prod, one might extend the config by dedicated setup depending upon a stage.



## Worker
### Define worker
https://developer.mozilla.org/en-US/docs/Web/API/Worker/message_event

```
self.addEventListener("message", (event) => {
  //unpack the message content
  const { data } = event;
  // my fancy logic
  ...
  // post response
  self.postMessage({fibonacciResult});
});
```

### Using worker

```
import React, { useEffect, useState } from 'react'

const MyReactComponent = () => {
  
    useEffect(() => {
        const worker = new Worker(newURL("workerpath.ts", import.meta.url), type:"module"})
        worker.postMessage({type:"messageType", someData:{...}})
        // One might listen for the response
        worker.onmessage = (e) => {
            let {responseData} = e.data
            // logic
        }
    }, [someVariable])
  
    return (
    <div>
        // content
    </div>
  )
}

export {MyReactComponent}

```
