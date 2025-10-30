import path from "path";
import { Archiver } from "archiver";
import { FileGeneratorApp } from "../core/FileGeneratorApp";
import { GeneratorDefault } from "../core/GeneratorDefault";
import { EntityFileGenerator } from "../core/EntityFileGenerator";
import { RootConfig } from "../interfaces/rootConfig.interface";

export class TypeScriptGenerator {
  private readonly templatesDir: string;

  constructor(private readonly archive: Archiver) {
    this.templatesDir = path.join(
      __dirname,
      "..",
      "..",
      "templates",
      "typescript"
    );
  }

  public async generate(json: RootConfig): Promise<void> {
    const fileGenerator = new FileGeneratorApp(this.templatesDir);
    const defaultGenerator = new GeneratorDefault(this.templatesDir);
    const entityGenerator = new EntityFileGenerator(fileGenerator);

    const defaultFiles = await defaultGenerator.generateTypescript();
    defaultFiles.forEach((file) =>
      this.archive.append(file.content, { name: file.path })
    );

    for (const config of json.generationConfigs) {
      const files = await fileGenerator.generate([config]);
      files.forEach((file) =>
        this.archive.append(file.content, { name: file.path })
      );
    }

    const entityNames = json.generationConfigs.map((cfg) => ({
      name: cfg.entityName,
      extension: ".ts",
      properties: cfg.properties,
    }));

    const entityFiles = await entityGenerator.generateEntities(entityNames);
    entityFiles.forEach((file) =>
      this.archive.append(file.content, { name: file.path })
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
      this.archive.append(file.content, { name: file.path })
    );
  }
}
