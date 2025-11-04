import fs from "fs";
import chalk from "chalk";
import { Validator } from "../../lib/Validator";
import { RootConfig } from "../../interfaces/rootConfig.interface";

/**
 * Command: crudius validate
 * Validates the user's crudius.config.json file
 */
export async function runValidate() {
  console.log(chalk.blueBright.bold("🔍 Validating crudius.config.json...\n"));

  const configPath = "crudius.config.json";

  if (!fs.existsSync(configPath)) {
    console.log(
      chalk.redBright("Configuration file not found: crudius.config.json")
    );
    console.log(
      chalk.yellow("Try running: ") + chalk.white("crudius init") + "\n"
    );
    return;
  }

  try {
    const rawData = fs.readFileSync(configPath, "utf-8");
    const config: RootConfig = JSON.parse(rawData);

    const validationResult = await Validator.IsValidRootConfig(config);

    if (validationResult === true) {
      console.log(chalk.greenBright("Configuration is valid!\n"));
    } else {
      console.log(chalk.redBright("Configuration is invalid:\n"));
      console.log(chalk.white(validationResult));
      console.log();
    }
  } catch (err) {
    console.error(chalk.red("Error reading configuration file:\n"), err);
  }
}
