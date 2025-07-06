import FileManager from "./FileManager";
import * as ejs from "ejs";
import * as path from "path";

interface TemplateData {
  [key: string]: any;
}
class EjsTemplateRenderer {
  private fileManager: FileManager;
  private readonly templateBaseDir: string;

  constructor(templateBaseDir: string) {
    this.fileManager = new FileManager();
    this.templateBaseDir = templateBaseDir;
  }

  public async render(
    templateName: string,
    data: TemplateData
  ): Promise<string> {
    const templatePath = path.join(this.templateBaseDir, templateName);
    try {
      const templateContent = await this.fileManager.readFile(templatePath);
      const renderedContent = ejs.render(templateContent, data, {
        filename: templatePath,
        async: false,
      });
      return renderedContent;
    } catch (error: any) {
      throw new Error(
        `Template rendering error ${templateName}: ${error.message}`
      );
    }
  }
}

export default EjsTemplateRenderer;
