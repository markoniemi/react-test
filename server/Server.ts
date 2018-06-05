import * as Http from "http";
import * as Webpack from "webpack";
import {Compiler} from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import {Configuration} from "webpack-dev-server";
import * as logger from "winston";
import webpackConfig from "../webpack.config";

// TODO rename file to Server.ts
export default class Server {
  private readonly compiler: Compiler;
  private readonly devServerConfig: Configuration;

  public constructor(private serverHost: string, private serverPort: number,
                     private backendHost: string, private backendPort: number) {
    this.compiler = Webpack(webpackConfig);
    this.devServerConfig = {
      contentBase: "./public",
      hot: true,
      proxy: {
        "/api/*": "http://" + backendHost + ":" + backendPort,
      },
      publicPath: "",
    };
  }

  public start(): Http.Server {
    const server = new WebpackDevServer(this.compiler, this.devServerConfig);

    const httpServer: Http.Server = server.listen(this.serverPort, this.serverHost, (err) => {
      if (err) {
        logger.error(err.message);
      }
      logger.info("Local web server runs at http://" + this.serverHost + ":" + this.serverPort);
    });

    return httpServer;
  }
}