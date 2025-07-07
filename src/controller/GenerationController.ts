import { IncomingMessage, ServerResponse } from "http";
import { FileGeneratorApp } from "../core/FileGeneratorApp";
import path from "path";

export class GenerationController {
  private readonly templatesDir: string;
  private readonly outputDir: string;
  private readonly fileGenerator: FileGeneratorApp;

  constructor() {
    this.templatesDir = path.join(__dirname, "..", "templates", "typescript");
    this.outputDir = path.join(__dirname, "..", "..", "output");
    this.fileGenerator = new FileGeneratorApp(
      this.templatesDir,
      this.outputDir
    );
  }

  public async generate(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => {
      try {
        const json = JSON.parse(body);

        if (!json.generationConfigs || !Array.isArray(json.generationConfigs)) {
          throw new Error("generationConfigs invalid or missing.");
        }

        const entityNames = json.generationConfigs.map((cfg: any) => ({
          name: cfg.entityName,
        }));
        await this.fileGenerator.generateDefaultFiles();
        await this.fileGenerator.generate(json.generationConfigs);
        await this.fileGenerator.generate(
          [
            {
              entityName: "Routes",
              properties: [],
              filesToGenerate: [
                {
                  templateName: "routes-template",
                  outputFileName: "routes.ts",
                  outputPath: "src/routes",
                },
              ],
            },
          ],
          { entities: entityNames }
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Files generated successfully!" }));
      } catch (err: any) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message || "Unknown error" }));
      }
    });
  }
}
