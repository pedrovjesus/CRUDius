import http, {
  Server as HttpServer,
  IncomingMessage,
  ServerResponse,
} from "http";

class App {
  private server: HttpServer;
  private readonly port: number;
  constructor(port: number) {
    this.port = port;
    this.server = http.createServer(this.requestHandler.bind(this));
  }

  private requestHandler(req: IncomingMessage, res: ServerResponse): void {
    if (req.url === "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Olá do servidor TypeScript (com classes)!\n");
    } else if (req.url === "/info") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Esta é uma rota de informação!",
          timestamp: new Date().toISOString(),
        })
      );
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Rota não encontrada.\n");
    }
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

export default App
