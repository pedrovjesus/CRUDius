import EjsTemplateRenderer from "./lib/EjsTemplateRenderer";
import FileManager from "./lib/FileManager";
import * as path from "path";

export interface GenerationOptions {
  templateName: string;
  outputFileName: string;
  data: { [key: string]: any };
}

export class FileGeneratorApp {
  private renderer: EjsTemplateRenderer;
  private fileManager: FileManager;
  private readonly templatesDir: string;
  private readonly outputDir: string;

  constructor(templatesDir: string, outputDir: string) {
    this.templatesDir = templatesDir;
    this.outputDir = outputDir;
    this.renderer = new EjsTemplateRenderer(templatesDir);
    this.fileManager = new FileManager();
  }

  public async generateFile(options: GenerationOptions): Promise<void> {
    const { templateName, outputFileName, data } = options;
    const outputPath = path.join(this.outputDir, outputFileName);

    try {
      console.log(`Rendering template: ${templateName}...`);
      const generatedContent = await this.renderer.render(templateName, data);

      console.log(`Writing file: ${outputPath}...`);
      await this.fileManager.writeFile(outputPath, generatedContent);

      console.log(
        `File '${outputFileName}' successfully generated in '${this.outputDir}'!`
      );
    } catch (error: any) {
      console.error(`Error generating file ${outputFileName}:`, error.message);
      throw error;
    }
  }
}
