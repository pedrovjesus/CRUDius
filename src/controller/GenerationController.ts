import { IncomingMessage, ServerResponse } from "http";
import { FileGeneratorApp } from "../core/FileGeneratorApp";
import path from "path";
import archiver from "archiver";

export class GenerationController {
  private readonly templatesDir: string;

  constructor() {
    this.templatesDir = path.join(__dirname, "..", "templates", "typescript");
  }

  /**
   * File generation controller, responsible for receiving and handling data
   */
  public async generate(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => {
      try {
        const json = JSON.parse(body);

        if (!json.generationConfigs || !Array.isArray(json.generationConfigs)) {
          throw new Error("generationConfigs invalid or missing.");
        }

        const archive = archiver("zip", { zlib: { level: 9 } });

        res.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="generated.zip"',
        });

        archive.pipe(res);

        const fileGenerator = new FileGeneratorApp(this.templatesDir);

        const defaultFiles = await fileGenerator.generateDefaultFiles();
        for (const file of defaultFiles) {
          archive.append(file.content, { name: file.path });
        }

        for (const config of json.generationConfigs) {
          const files = await fileGenerator.generate([config]);
          for (const file of files) {
            archive.append(file.content, { name: file.path });
          }
        }

        const entityNames = json.generationConfigs.map((cfg: any) => ({
          name: cfg.entityName,
        }));
        const entityFiles =
          await fileGenerator.generateEntityFilesAutomatically(entityNames);
        for (const file of entityFiles) {
          archive.append(file.content, { name: file.path });
        }

        const routeFiles = await fileGenerator.generate(
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

        for (const file of routeFiles) {
          archive.append(file.content, { name: file.path });
        }

        await archive.finalize();
      } catch (err: any) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message || "Unknown error" }));
      }
    });
  }
}
