import { FileGeneratorApp } from "./FileGeneratorApp";
import { IProperty } from "../interfaces/property.interface";

export class EntityFileGenerator {
  constructor(private fileGenerator: FileGeneratorApp) {}

  public async generateEntities(
    entities: { name: string; extension?: string; properties: IProperty[] }[]
  ): Promise<GeneratedFile[]> {
    const allFiles: GeneratedFile[] = [];

    for (const [index, entity] of entities.entries()) {
      const ext = entity.extension || ".ts";
      const number = String(index).padStart(3, "0");

      const entityFiles = await this.fileGenerator.generate([
        {
          entityName: entity.name,
          properties: entity.properties,
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
            {
              templateName: "migration-template",
              outputFileName: `${number}_create_${entity.name}.migration`,
              extension: ext,
              outputPath: `src/database/migrations`,
            }
          ],
        },
      ]);

      allFiles.push(...entityFiles);
    }

    return allFiles;
  }
}
