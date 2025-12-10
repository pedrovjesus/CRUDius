import { FileGeneratorApp } from "./FileGeneratorApp";
import { IProperty } from "../interfaces/property.interface";

export class EntityFileGenerator {
  constructor(private fileGenerator: FileGeneratorApp) {}

  public async generateEntities(
    entities: {
      name: string;
      extension?: string;
      properties: IProperty[];
      relations?: any[];
    }[]
  ): Promise<GeneratedFile[]> {
    const allFiles: GeneratedFile[] = [];

    const extraData = {
      entities: entities.map((e) => ({
        name: e.name,
        extension: e.extension || ".ts",
        properties: e.properties,
        relations: e.relations ?? [],
      })),
    };

    for (const [index, entity] of entities.entries()) {
      const ext = entity.extension || ".ts";
      const number = String(index).padStart(3, "0");

      const cleanedProperties = entity.properties.filter((p) => {
        return !(entity.relations ?? []).some(
          (r) => r.type === "belongsTo" && r.field === p.field
        );
      });

      const entityFiles = await this.fileGenerator.generate(
        [
          {
            entityName: entity.name,
            properties: cleanedProperties,
            relations: entity.relations ?? [],
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
                templateName: "swagger.infos",
                outputFileName: `swagger`,
                extension: ".json",
                outputPath: `docs`,
              },
              {
                templateName: "migration-template",
                outputFileName: `${number}_create_${entity.name}.migration`,
                extension: ext,
                outputPath: `src/database/migrations`,
              },
            ],
          },
        ],
        extraData
      );

      allFiles.push(...entityFiles);
    }

    return allFiles;
  }
}
