const withLessExcludeAntd = require("./next-less.config.js");
const antdCustom = require("./assets/antd-custom.json");
const withCss = require("@zeit/next-css");

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

module.exports = withLessExcludeAntd(
  withCss({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]"
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: antdCustom
    },
    publicRuntimeConfig: require("./config.json")
  })
);
