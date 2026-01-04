const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",   // injects CSS to DOM
          "css-loader",     // translates CSS into CommonJS
          "postcss-loader", // runs PostCSS (Tailwind, autoprefixer)
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",

      remotes: {
        sharedUI: "sharedUI@http://localhost:3001/remoteEntry.js",
        dashboard: "dashboard@http://localhost:3003/remoteEntry.js",
        formDesigner: "formDesigner@http://localhost:3002/remoteEntry.js",
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