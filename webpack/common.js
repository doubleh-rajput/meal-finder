const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name]-build.js",
    path: path.resolve("./build")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|json)$/,
        exclude: [/node_modules/],
        use: [{ loader: "babel-loader" }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    alias: {
      '@app': path.resolve(__dirname, "../src/"),
    }
  }
};