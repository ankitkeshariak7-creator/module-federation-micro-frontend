const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  devServer: {
    port: 3003,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",

      remotes: {
        formDesigner: "formDesigner@http://localhost:3002/remoteEntry.js",
        sharedUI: "sharedUI@http://localhost:3001/remoteEntry.js"
      },

      exposes: {
        "./Dashboard": "./src/Dashboard",
      },

      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: false,
        },
        "react-router-dom": { singleton: true, requiredVersion: "^6.11.2" },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },
};
