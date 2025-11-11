import fs from "fs";
import chalk from "chalk";
import { runValidate } from "./validate";
import { GenerationService } from "../../core/GenerationService";
import { RootConfig } from "../../interfaces/rootConfig.interface";
import { createWriteStream } from "fs";

/**
 * Command: crudius generate
 * Reads configuration and generates the CRUD boilerplate ZIP
 */
export async function runGenerate() {
  console.log(
    chalk.blueBright.bold("⚙️  Generating code from configuration...\n")
  );
  await runValidate();

  const configPath = "crudius.config.json";

  if (!fs.existsSync(configPath)) {
    console.log(
      chalk.redBright("Configuration not found: crudius.config.json\n")
    );
    console.log(chalk.yellow("Run `crudius init` to create one.\n"));
    return;
  }

  try {
    const rawData = fs.readFileSync(configPath, "utf-8");
    const config: RootConfig = JSON.parse(rawData);
    const output = createWriteStream("crudius-output.zip");
    const generator = new GenerationService("typescript");

    console.log(chalk.cyan(" Generating archive..."));

    await generator.generateArchive(config, output);

    console.log(chalk.greenBright("\n Code generated successfully!"));
    console.log(
      chalk.white("Generated file: ") + chalk.yellow("crudius-output.zip\n")
    );
  } catch (err) {
    console.error(
      chalk.redBright("\n Error while processing configuration file:\n"),
      err
    );
  }
}
