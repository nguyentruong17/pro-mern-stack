const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require('path');

require("dotenv").config();

const PORT = process.env.UI_SERVER_PORT || 3000;
const API_ENDPOINT =
  process.env.API_ENDPOINT || "http://localhost:8000/graphql";
const API_PROXY_TARGET = process.env.API_PROXY_TARGET;
//const API_ENDPOINT = 'http://localhost:4000/graphql';
const ENV = { API_ENDPOINT };

//Hot-Module-Replacement functionality ~ this section is just too confusing
//This middleware has to be installed before using the 'static' middleware,
//otherwise the 'static' middleware will find the bundles and send them as the response
//before the HMR takes effect
const enableHMR = process.env.ENABLE_HMR || true;
if (!!enableHMR && process.env.NODE_ENV !== "production") {
  console.log("Adding dev middleware, enabling HMR");

  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  const devMiddleware = require("webpack-dev-middleware"); //compiles the code + sends out the modules
  const hotMiddleware = require("webpack-hot-middleware"); //incrementally sends the modules to the browser

  //additional entry points that webpack can build the client-side code for this extra functionality
  webpackConfig.entry.app.push("webpack-hot-middleware/client");

  //install a plugin that generates incremental updates rather than the entire bundle
  webpackConfig.plugins = webpackConfig.plugins || [];
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(webpackConfig);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

app.use(express.static("public"));

if (API_PROXY_TARGET) {
  app.use("/graphql", createProxyMiddleware({ target: API_PROXY_TARGET }));
}

app.get("/env.js", (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(ENV)}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.listen(PORT, () => {
  console.log(`UI Server started on port ${PORT}`);
});
