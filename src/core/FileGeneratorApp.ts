import EjsTemplateRenderer from "../lib/EjsTemplateRenderer";
import FileManager from "../lib/FileManager";
import path from "path";

export interface Property {
  name: string;
  type: string;
}

export interface FileToGenerate {
  templateName: string;
  outputFileName: string;
  outputPath: string;
}

export interface GenerationConfig {
  entityName: string;
  properties: Property[];
  filesToGenerate: FileToGenerate[];
}

export class FileGeneratorApp {
  private readonly renderer: EjsTemplateRenderer;
  private readonly fileManager: FileManager;

  constructor(
    private readonly templatesDir: string,
    private readonly outputBaseDir: string
  ) {
    this.renderer = new EjsTemplateRenderer(templatesDir);
    this.fileManager = new FileManager();
  }

  /**
   * Generates all files based on the list of settings provided.
   */
  public async generate(configs: GenerationConfig[]): Promise<void> {
    for (const config of configs) {
      const { entityName, properties, filesToGenerate } = config;

      for (const file of filesToGenerate) {
        const templateFile = file.templateName.endsWith(".ejs")
          ? file.templateName
          : `${file.templateName}.ejs`;

        const outputPath = path.join(
          this.outputBaseDir,
          file.outputPath,
          file.outputFileName
        );

        const data = {
          entityName,
          properties,
        };

        try {
          console.log(`🔧 Generating: ${outputPath} from ${templateFile}...`);
          const content = await this.renderer.render(templateFile, data);
          await this.fileManager.writeFile(outputPath, content);
          console.log(`✅ File saved: ${outputPath}`);
        } catch (error: any) {
          console.error(`❌ Error generating ${outputPath}:`, error.message);
          throw error;
        }
      }
    }
  }
}
