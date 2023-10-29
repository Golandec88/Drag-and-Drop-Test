const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/Drag-and-Drop-Test/" : "/",
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@public": path.resolve(__dirname, "public"),
        "@data": path.resolve(__dirname, "data"),
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("svg")
      .test(/\.svg$/)
      .use("html-loader")
      .loader("html-loader");
  },
});
