// vue.config.js
const EncodingPlugin = require("webpack-encoding-plugin");
module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  configureWebpack: {
    plugins: [new EncodingPlugin({ encoding: "GB2312" })]
  }
};
