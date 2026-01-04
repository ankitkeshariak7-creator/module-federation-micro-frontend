const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  devServer: {
    port: 3002,
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
      name: "formDesigner",
      filename: "remoteEntry.js",

      remotes: {
        sharedUI: "sharedUI@http://localhost:3001/remoteEntry.js",
      },

      exposes: {
        "./Form": "./src/Form",
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
