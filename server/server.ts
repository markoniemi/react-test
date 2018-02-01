import * as Http from "http";
import * as Webpack from "webpack";
import {Compiler} from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import {Configuration} from "webpack-dev-server";
import * as logger from "winston";
import webpackConfig from "../webpack.config";

export default function createServer(serverHost: string, serverPort: number,
                                     backendHost: string, backendPort: number): Http.Server {

  const compiler: Compiler = Webpack(webpackConfig);
  const devServerConfig: Configuration = {
    contentBase: "./public",
    publicPath: "",
    hot: true,
    proxy: {
      "/api/*": "http://" + backendHost + ":" + backendPort,
    },
  };
  const server = new WebpackDevServer(compiler, devServerConfig);

  const httpServer: Http.Server = server.listen(serverPort, serverHost, (err) => {
    if (err) {
      logger.error(err.message);
    }
    logger.info("Local web server runs at http://" + serverHost + ":" + serverPort);
  });

  return httpServer;
}
