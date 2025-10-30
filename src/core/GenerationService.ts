import archiver from "archiver";
import { RootConfig } from "../interfaces/rootConfig.interface";
import { TypeScriptGenerator } from "../generators/TypeScriptGenerator";
import { PhpGenerator } from "../generators/PhpGenerator";
import { PythonGenerator } from "../generators/PythonGenerator";

/**
 * Service responsible for generating source code files from a JSON configuration
 * and packaging them into a ZIP archive.
 */
export class GenerationService {
  /**
   * @param language - Specifies the target programming language for code generation.
   *                   Accepts "typescript", "php", or "python".
   *                   Default is "typescript".
   */
  constructor(
    private readonly language: "typescript" | "php" | "python" = "typescript"
  ) {}

  /**
   * Generates a ZIP archive containing the generated code from the provided JSON configuration.
   *
   * @param json - Root configuration object defining the project structure to generate.
   * @param output - Writable stream where the ZIP archive will be written.
   *
   * @throws {Error} If the specified language is not supported.
   */
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

  /**
   * Creates a ZIP archive instance and pipes it to the provided output stream.
   *
   * @param output - Writable stream where the ZIP archive will be sent.
   * @returns An archiver instance configured with maximum compression.
   */
  private createArchive(output: NodeJS.WritableStream) {
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(output);
    return archive;
  }
}
