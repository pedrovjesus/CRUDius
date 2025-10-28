import { IncomingMessage, ServerResponse } from "http";
import { FileGeneratorApp } from "../core/FileGeneratorApp";
import path from "path";
import archiver from "archiver";
import { GeneratorDefault } from "../core/GeneratorDefault";
import { EntityFileGenerator } from "../core/EntityFileGenerator";
import { RootConfig } from "../interfaces/rootConfig.interface";
import { Validator } from "../lib/Validator";

export class GenerationController {
  private readonly templatesDir: string;

  constructor(language: "typescript" | "php" | "java" = "typescript") {
    this.templatesDir = path.join(__dirname, "..", "templates", language);
  }

  /**
   * File generation controller, responsible for receiving and handling data
   */
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

        const archive = archiver("zip", { zlib: { level: 9 } });
        res.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="generated.zip"',
        });
        archive.pipe(res);

        const fileGenerator = new FileGeneratorApp(this.templatesDir);
        const defaultGenerator = new GeneratorDefault(this.templatesDir);
        const entityGenerator = new EntityFileGenerator(fileGenerator);

        const defaultFiles = await defaultGenerator.generateTypescript();
        defaultFiles.forEach((file) =>
          archive.append(file.content, { name: file.path })
        );

        for (const config of json.generationConfigs) {
          const files = await fileGenerator.generate([config]);
          files.forEach((file) =>
            archive.append(file.content, { name: file.path })
          );
        }

        const entityNames = json.generationConfigs.map((cfg: any) => ({
          name: cfg.entityName,
          extension: ".ts",
        }));
        const entityFiles = await entityGenerator.generateEntities(entityNames);
        entityFiles.forEach((file) =>
          archive.append(file.content, { name: file.path })
        );

        const routeFiles = await fileGenerator.generate(
          [
            {
              entityName: "Routes",
              properties: [],
              filesToGenerate: [
                {
                  templateName: "routes-template",
                  outputFileName: "routes",
                  extension: ".ts",
                  outputPath: "src/routes",
                },
              ],
            },
          ],
          { entities: entityNames }
        );
        routeFiles.forEach((file) =>
          archive.append(file.content, { name: file.path })
        );

        await archive.finalize();
      } catch (err: any) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message || "Unknown error" }));
      }
    });
  }
}
