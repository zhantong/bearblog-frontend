const withLess = require("./next-less.config.js");
const withCss = require("@zeit/next-css");
const antdCustom = require("./assets/antd-custom.json");
module.exports = withLess(
  withCss({
    cssLoaderOptions: {
      localIdentName: "[local]_[hash:base64:5]"
    },
    lessLoaderOptions: {
      cssModules: true,
      javascriptEnabled: true
    },
    antdLessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: antdCustom
    },
    publicRuntimeConfig: require("./config.json")
  })
);
