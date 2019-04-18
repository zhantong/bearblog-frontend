const cssLoaderConfig = require("@zeit/next-css/css-loader-config");

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      const { dev, isServer } = options;
      const {
        cssLoaderOptions,
        lessLoaderOptions = {},
        antdLessLoaderOptions = {}
      } = nextConfig;

      options.defaultLoaders.less = cssLoaderConfig(config, {
        cssModules: lessLoaderOptions.cssModules,
        cssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: "less-loader",
            options: lessLoaderOptions
          }
        ]
      });

      config.module.rules.push({
        test: /\.less$/,
        exclude: [/node_modules/],
        use: options.defaultLoaders.less
      });
      options.defaultLoaders.less = cssLoaderConfig(config, {
        cssModules: antdLessLoaderOptions.cssModules,
        cssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: "less-loader",
            options: antdLessLoaderOptions
          }
        ]
      });

      config.module.rules.push({
        test: /\.less$/,
        include: [/node_module/],
        use: options.defaultLoaders.less
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
