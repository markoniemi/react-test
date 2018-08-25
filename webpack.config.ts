import * as Dotenv from "dotenv-webpack";
import * as path from "path";
import webpack = require("webpack");

const webpackConfig: webpack.Configuration = {
  mode: "development",
  devtool: "source-map",
  entry: {
    app: [
      "babel-polyfill",
      "react-hot-loader/patch",
      "./src/index",
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.json$/, loader: "json-loader"}, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: "url-loader?limit=100000@name=[name][ext]",
      }],
  },
  plugins: [
    // Dotenv reads config/development.env file to process.env
    new Dotenv({
      path: "config/development.env",
      systemvars: true,
    }),
  ],
};
export default webpackConfig;
