import { FileGeneratorApp } from "./FileGeneratorApp";

export class EntityFileGenerator {
  constructor(private fileGenerator: FileGeneratorApp) {}

  /**
   * 
   * @param entities 
   * @returns generates entity files according to the specified extension 
   */
  public async generateEntities(
    entities: { name: string; extension: string }[]
  ): Promise<GeneratedFile[]> {
    const allFiles: GeneratedFile[] = [];
    for (const entity of entities) {
      const entityFiles = await this.fileGenerator.generate([
        {
          entityName: entity.name,
          properties: [],
          filesToGenerate: [
            {
              templateName: "controller-template",
              outputFileName: `${entity.name}.controller`,
              extension: entity.extension,
              outputPath: `src/controllers/${entity.name}`,
            },
            {
              templateName: "service-template",
              outputFileName: `${entity.name}.service`,
              extension: entity.extension,
              outputPath: `src/services/${entity.name}`,
            },
          ],
        },
      ]);

      allFiles.push(...entityFiles);
    }

    return allFiles;
  }
}
