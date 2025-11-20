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

  private appendFiles(files: GeneratedFile[]) {
    files.forEach((f) => this.archive.append(f.content, { name: f.path }));
  }

  public async generate(json: RootConfig): Promise<void> {
    const fileGenerator = new FileGeneratorApp(this.templatesDir);
    const defaultGenerator = new GeneratorDefault(this.templatesDir);
    const entityGenerator = new EntityFileGenerator(fileGenerator);

    this.appendFiles(await defaultGenerator.generateTypescript());

    for (const config of json.generationConfigs) {
      this.appendFiles(await fileGenerator.generate([config]));
    }

    const entityNames = json.generationConfigs.map((cfg, index) => ({
      name: cfg.entityName,
      extension: ".ts",
      properties: cfg.properties,
      index,
    }));

    this.appendFiles(await entityGenerator.generateEntities(entityNames));

    const extraFilesConfig = [
      {
        entityName: "Routes",
        outputFileName: "routes",
        templateName: "routes-template",
        outputPath: "src/routes",
      },
      {
        entityName: "ETableNames",
        outputFileName: "ETableNames",
        templateName: "Etables-knex",
        outputPath: "src/database",
      },
      {
        entityName: "typesKnex",
        outputFileName: "knex.d",
        templateName: "types-template-knex",
        outputPath: "src/database/@types",
      },
    ];

    for (const cfg of extraFilesConfig) {
      const generated = await fileGenerator.generate(
        [
          {
            entityName: cfg.entityName,
            properties: [],
            filesToGenerate: [
              {
                templateName: cfg.templateName,
                outputFileName: cfg.outputFileName,
                extension: ".ts",
                outputPath: cfg.outputPath,
              },
            ],
          },
        ],
        { entities: entityNames }
      );

      this.appendFiles(generated);
    }
  }
}
