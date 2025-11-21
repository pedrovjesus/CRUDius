import fs from "fs";
import path from "path";
import chalk from "chalk";

/**
 * Command: crudius clean
 * Removes generated files and output artifacts
 */
export async function runClean() {
  console.log(chalk.blueBright.bold("Cleaning Crudius generated files...\n"));

  const filesToRemove = [
    "crudius-output.zip",
    "crudius.config.json",
    "crudius.config.json.bak",
    "dist",
    "crudius-output",
    "build",
  ];

  let removedCount = 0;

  for (const file of filesToRemove) {
    const filePath = path.resolve(process.cwd(), file);

    if (fs.existsSync(filePath)) {
      try {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }

        console.log(chalk.green(`✔ Removed: ${file}`));
        removedCount++;
      } catch (err) {
        console.error(chalk.red(`✖ Failed to remove ${file}:`), err);
      }
    }
  }

  if (removedCount === 0) {
    console.log(chalk.yellow("No generated files found to clean."));
  } else {
    console.log(
      chalk.greenBright(`\n Clean completed! (${removedCount} removed)\n`)
    );
  }
}
