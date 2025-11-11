import fs from "fs";
import chalk from "chalk";
import { Validator } from "../../lib/Validator";
import { RootConfig } from "../../interfaces/rootConfig.interface";
import { validateConfig } from "../utils/validateConfig";

/**
 * Command: crudius validate
 * Validates the user's crudius.config.json file
 */
export async function runValidate() {
  await validateConfig();
}
