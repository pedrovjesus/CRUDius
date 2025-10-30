import { IncomingMessage, ServerResponse } from "http";
import { RootConfig } from "../interfaces/rootConfig.interface";
import { Validator } from "../lib/Validator";
import { GenerationService } from "../core/GenerationService";

export class GenerationController {
  private readonly generationService = new GenerationService("typescript");

  public async generateTypescript(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => {
      try {
        const json: RootConfig = JSON.parse(body);
        const validationResult = await Validator.IsValidRootConfig(json);

        if (validationResult !== true) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: validationResult }));
        }

        res.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="generated.zip"',
        });

        await this.generationService.generateArchive(json, res);
      } catch (err: any) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message || "Unknown error" }));
      }
    });
  }
}
