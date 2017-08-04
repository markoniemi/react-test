import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import webpackConfig from "../webpack.config";
import createBackend from "./backend";

const serverHost = "localhost";
const serverPort: number = 8080;
const backendHost = "localhost";
const backendPort: number = 5001;

// TODO set host and port as environment variables
function createServer(host: string, port: number) {

  const compiler = Webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, {
    contentBase: "./public",
    hot: true,
    proxy: {
      "/api/*": {
        // TODO get host and port as parameters?
        target: "http://" + backendHost + ":" + backendPort,
      },
    },
  });

  server.listen(port, host, (err) => {
    if (err) {
      // noinspection TsLint
      console.log(err);
    }
    // noinspection TsLint
    console.log("Local web server runs at http://" + host + ":" + port);
  });
}
createServer(serverHost, serverPort);
createBackend(backendHost, backendPort);
