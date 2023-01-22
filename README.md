# React + WebPack

## Dependencies
### Dependencies
* comlink
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
### Default approach
#### Define worker
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

#### Workers usage

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

#### Comlink library

* Add library to TS paths:
```
"paths": {
            "comlink": ["./node_modules/comlink/dist/esm/comlink"]
         }
```

* Create a worker
```
import { expose } from 'comlink';
// optionally import additional modules with heavy calculation

// Here is a sample method to wrap in a worker
const thisIsMyMethod = () => {}

// Create a worker

const worker = {
    thisIsMyMethod
}

// export a worker type to wrap it in a component
export type WorkerType = typeof worker;


// The comlink.expose() method is used in Comlink to expose an object or function to a web worker.
// It takes an object or function as its argument, and returns a proxy object that can be passed 
// to the worker. The worker can then call methods on the proxy object as if they were local, 
// while the calls are actually made on the original object or function.

expose (worker);
```

* Use a worker in a component:

```
const onClick = async () => {
    const worker = new Worker(
      new URL("../../workers/my_fancy_comlink_worker.ts", import.meta.url),
      { type: "module", name: "fibonacci" }
    );
    const myWorker = wrap<WorkerType>(worker);
    // tasks might destructured
    task.thisIsMyMethod(params)
  };

```

### BUILD

`npm run build`

After building the application in `./dist/` one might observe two additional bundle files which are created based on the number of additional workers in your application.
