import * as path from "path";
import webpack = require("webpack");

const backendHost = "localhost";
const backendPort = "5001";

const webpackConfig: webpack.Configuration = {
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
  devServer: {
    proxy: {
      "/api/*": {
        // TODO get host and port as parameters?
        target: "http://" + backendHost + ":" + backendPort,
      },
    },
  },
};
export default webpackConfig;
