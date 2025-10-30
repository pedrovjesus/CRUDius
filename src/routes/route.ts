import { IncomingMessage, ServerResponse } from "http";
import { GenerationController } from "../controller/GenerationController";

const generationController = new GenerationController();

export async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  if (req.method === "POST" && req.url === "/generate") {
    return generationController.generateTypescript(req, res);
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the file generation API!");
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}
