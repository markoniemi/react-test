import * as Http from "http";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import webpackConfig from "../webpack.config";

export default function createServer(serverHost: string, serverPort: number, backendHost: string, backendPort: number): Http.Server {

  const compiler = Webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, {
    contentBase: "./public",
    hot: true,
    publicPath: "",
    proxy: {
      "/api/*": {
        // TODO get host and port as parameters?
        target: "http://" + backendHost + ":" + backendPort,
      },
    },
  });

  const httpServer: Http.Server = server.listen(serverPort, serverHost, (err) => {
    if (err) {
      // noinspection TsLint
      console.log(err);
    }
    // noinspection TsLint
    console.log("Local web server runs at http://" + serverHost + ":" + serverPort);
  });

  return httpServer;
}
