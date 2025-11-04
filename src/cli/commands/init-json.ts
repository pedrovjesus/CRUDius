import fs from "fs";
import chalk from "chalk";

export function runInitJson() {
  const template = {
    generationConfigs: [
      {
        entityName: "ExempleEntity",
        properties: [
          { field: "id", type: "number", primary: true },
          { field: "field", type: "string" },
          { field: "price", type: "number" },
          { field: "description", type: "string", optional: true },
        ],
        filesToGenerate: [],
      },
    ],
  };

  fs.writeFileSync("crudius.config.json", JSON.stringify(template, null, 2));
  console.log(chalk.green("crudius.config.json file successfully created!"));
}
