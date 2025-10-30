import archiver from "archiver";
import { RootConfig } from "../interfaces/rootConfig.interface";
import { TypeScriptGenerator } from "../generators/TypeScriptGenerator";
import { PhpGenerator } from "../generators/PhpGenerator";
import { PythonGenerator } from "../generators/PythonGenerator";

export class GenerationService {
  constructor(
    private readonly language: "typescript" | "php" | "python" = "typescript"
  ) {}

  public async generateArchive(
    json: RootConfig,
    output: NodeJS.WritableStream
  ): Promise<void> {
    const archive = this.createArchive(output);

    switch (this.language) {
      case "typescript":
        await new TypeScriptGenerator(archive).generate(json);
        break;
      case "php":
        // await new PhpGenerator(archive).generate(json);
        break;
      case "python":
        // await new PythonGenerator(archive).generate(json);
        break;
      default:
        throw new Error(`Unsupported language: ${this.language}`);
    }

    await archive.finalize();
  }

  private createArchive(output: NodeJS.WritableStream) {
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(output);
    return archive;
  }
}
