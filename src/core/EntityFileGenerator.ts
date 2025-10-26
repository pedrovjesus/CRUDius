import { FileGeneratorApp } from "./FileGeneratorApp";

export class EntityFileGenerator {
  constructor(private fileGenerator: FileGeneratorApp) {}

  /**
   * Generates entity files (controller, service, entity) according to the specified extension
   */
  public async generateEntities(
    entities: { name: string; extension?: string }[]
  ): Promise<GeneratedFile[]> {
    const allFiles: GeneratedFile[] = [];

    for (const entity of entities) {
      const ext = entity.extension || ".ts";

      const entityFiles = await this.fileGenerator.generate([
        {
          entityName: entity.name,
          properties: [],
          filesToGenerate: [
            {
              templateName: "controller-template",
              outputFileName: `${entity.name}.controller`,
              extension: ext,
              outputPath: `src/controllers/${entity.name}`,
            },
            {
              templateName: "service-template",
              outputFileName: `${entity.name}.service`,
              extension: ext,
              outputPath: `src/services/${entity.name}`,
            },
            {
              templateName: "entity-template",
              outputFileName: `${entity.name}.entity`,
              extension: ext,
              outputPath: `src/entities`,
            },
          ],
        },
      ]);

      allFiles.push(...entityFiles);
    }

    return allFiles;
  }
}
