const { merge } = require("webpack-merge");
const common = require("./common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",

  devServer: {
    hot: true,
    host: "localhost",
    port: 8000,
    // stats: {
    //   colors: true,
    //   hash: false,
    //   version: false,
    //   timings: false,
    //   assets: false,
    //   chunks: false,
    //   modules: false,
    //   reasons: false,
    //   children: false,
    //   source: false,
    //   errors: false,
    //   errorDetails: false,
    //   warnings: false,
    //   publicPath: false,
    // },
    proxy: {},
    inline: true,
    historyApiFallback: true
    // historyApiFallback: {
    //   index: "index.html"
    // }
  },
  module: {

  }
});