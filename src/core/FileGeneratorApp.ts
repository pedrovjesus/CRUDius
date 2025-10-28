import { IGenerationConfig } from "../interfaces/generationConfig.interface";
import EjsTemplateRenderer from "../lib/EjsTemplateRenderer";
import path from "path";

interface ExtraData {
  entities: { name: string; extension: string }[];
}

export class FileGeneratorApp {
  private readonly renderer: EjsTemplateRenderer;

  constructor(private readonly templatesDir: string) {
    this.renderer = new EjsTemplateRenderer(templatesDir);
  }

  /**
   * Generates all files based on the list of settings provided.
   */
  public async generate(
    configs: IGenerationConfig[],
    extraData?: ExtraData
  ): Promise<GeneratedFile[]> {
    const generatedFiles: GeneratedFile[] = [];

    for (const config of configs) {
      const { entityName, properties, filesToGenerate } = config;

      for (const file of filesToGenerate) {
        const templateFile = file.templateName.endsWith(".ejs")
          ? file.templateName
          : `${file.templateName}.ejs`;

        const extension = file.extension || ".ts";

        const fileName = file.outputFileName.endsWith(extension)
          ? file.outputFileName
          : file.outputFileName + extension;

        const relativePath = path.join(
          file.outputPath || `src/controllers/${entityName}`,
          fileName
        );

        const data = {
          entityName,
          properties,
          extension,
          ...(extraData || {}),
        };

        try {
          const content = await this.renderer.render(templateFile, data);
          generatedFiles.push({ path: relativePath, content });
        } catch (error: any) {
          console.error(`❌ Error generating ${relativePath}:`, error.message);
          throw error;
        }
      }
    }

    return generatedFiles;
  }
}
