import http, {
  Server as HttpServer,
  IncomingMessage,
  ServerResponse,
} from "http";
import { handleRequest } from "./routes/route";
class App {
  private server: HttpServer;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.server = http.createServer(this.requestHandler.bind(this));
  }

  private requestHandler(req: IncomingMessage, res: ServerResponse): void {
    handleRequest(req, res);
  }

  public start(): void {
    this.server.listen(this.port, () => {
      console.log(`Servidor rodando em http://localhost:${this.port}/`);
    });

    process.on("SIGTERM", this.stop.bind(this));
    process.on("SIGINT", this.stop.bind(this));
  }

  public stop(): void {
    this.server.close(() => {
      console.log("Servidor encerrado.");
      process.exit(0);
    });
  }
}

export default App;
