import fs from "fs";
import chalk from "chalk";
import { RootConfig } from "../../interfaces/rootConfig.interface";
import { Validator } from "../../lib/Validator";

/**
 * Internal function to validate config and return boolean
 */
export async function validateConfig(): Promise<boolean> {
  const configPath = "crudius.config.json";

  if (!fs.existsSync(configPath)) {
    console.log(
      chalk.redBright("Configuration file not found: crudius.config.json")
    );
    console.log(chalk.yellow("Run `crudius init` to create one.\n"));
    return false;
  }

  try {
    const rawData = fs.readFileSync(configPath, "utf-8");
    const config: RootConfig = JSON.parse(rawData);

    const validationResult = await Validator.IsValidRootConfig(config);

    if (validationResult === true) {
      console.log(chalk.greenBright("Configuration is valid!\n"));
      return true;
    } else {
      console.log(chalk.redBright("Configuration is invalid:\n"));
      console.log(chalk.white(validationResult));
      console.log();
      return false;
    }
  } catch (err) {
    console.error(chalk.red("Error reading configuration file:\n"), err);
    return false;
  }
}


