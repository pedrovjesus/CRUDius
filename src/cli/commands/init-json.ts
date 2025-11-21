import chalk from "chalk";
import fs from "fs";

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

      {
        entityName: "User",
        properties: [
          { field: "id", type: "number", primary: true },
          { field: "name", type: "string" },
          { field: "email", type: "string" },
          { field: "password", type: "string" },
          { field: "isAdmin", type: "boolean", optional: true },
        ],
        filesToGenerate: [],
      },

      {
        entityName: "Product",
        properties: [
          { field: "id", type: "number", primary: true },
          { field: "name", type: "string" },
          { field: "price", type: "number" },
          { field: "stock", type: "number" },
          { field: "category", type: "string" },
        ],
        filesToGenerate: [],
      },

      {
        entityName: "Order",
        properties: [
          { field: "id", type: "number", primary: true },
          { field: "userId", type: "number" },
          { field: "total", type: "number" },
          { field: "status", type: "string" },
          { field: "createdAt", type: "string", optional: true },
        ],
        filesToGenerate: [],
      },

      {
        entityName: "Category",
        properties: [
          { field: "id", type: "number", primary: true },
          { field: "name", type: "string" },
          { field: "description", type: "string", optional: true },
        ],
        filesToGenerate: [],
      },
    ],
  };

  fs.writeFileSync("crudius.config.json", JSON.stringify(template, null, 2));
  console.log(chalk.green("crudius.config.json file successfully created!"));
}
