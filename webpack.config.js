const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {

  plugins: [new HTMLWebpackPlugin({ template: "./src/index.html" })],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {extensions: [".js", ".jsx"]}
};