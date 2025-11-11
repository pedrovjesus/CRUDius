import fs, { createWriteStream } from "fs";
import chalk from "chalk";
import { runValidate } from "./validate";
import { GenerationService } from "../../core/GenerationService";
import { RootConfig } from "../../interfaces/rootConfig.interface";
import { validateConfig } from "../utils/validateConfig";

/**
 * Command: crudius generate
 * Reads configuration and generates the CRUD boilerplate ZIP
 */

export async function runGenerate(): Promise<void> {
  console.log(
    chalk.blueBright.bold("Generating code from configuration...\n")
  );

  const isValid = await validateConfig();
  if (!isValid) {
    console.log(
      chalk.redBright("Aborting generation due to invalid config.\n")
    );
    return;
  }

  const outputPath = "crudius-output.zip";
  const output = createWriteStream(outputPath);
  const generator = new GenerationService("typescript");

  try {
    console.log(chalk.cyan(" Generating archive..."));
    await generator.generateArchive(
      JSON.parse(fs.readFileSync("crudius.config.json", "utf-8")),
      output
    );
    console.log(chalk.greenBright("\n Code generated successfully!"));
    console.log(
      chalk.white("Generated file: ") + chalk.yellow(outputPath + "\n")
    );
  } catch (err) {
    console.error(chalk.redBright("\nError during code generation:\n"), err);

    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
      console.log(chalk.yellow("Partial output removed.\n"));
    }

    return;
  }
}
