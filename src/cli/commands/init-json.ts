import chalk from "chalk";
import fs from "fs";

export function runInitJson() {
  const template = {
    generationConfigs: [
      {
        entityName: "ExempleEntity",
        properties: [
          { field: "id", type: "number", primary: true, searchable: false },
          { field: "field", type: "string", searchable: true },
          { field: "price", type: "number", searchable: false },
          {
            field: "description",
            type: "string",
            optional: true,
            searchable: true,
          },
        ],
        filesToGenerate: [],
      },

      {
        entityName: "User",
        properties: [
          { field: "id", type: "number", primary: true, searchable: false },
          { field: "name", type: "string", searchable: true },
          { field: "email", type: "string", searchable: true },
          { field: "password", type: "string", searchable: false },
          {
            field: "isAdmin",
            type: "boolean",
            optional: true,
            searchable: false,
          },
        ],
        filesToGenerate: [],
      },

      {
        entityName: "Product",
        properties: [
          { field: "id", type: "number", primary: true, searchable: false },
          { field: "name", type: "string", searchable: true },
          { field: "price", type: "number", searchable: false },
          { field: "stock", type: "number", searchable: false },
          { field: "category", type: "string", searchable: true },
        ],
        filesToGenerate: [],
      },

      {
        entityName: "Order",
        properties: [
          { field: "id", type: "number", primary: true, searchable: false },
          { field: "userId", type: "number", searchable: false },
          { field: "total", type: "number", searchable: false },
          { field: "status", type: "string", searchable: true },
          {
            field: "createdAt",
            type: "string",
            optional: true,
            searchable: false,
          },
        ],
        filesToGenerate: [],
      },

      {
        entityName: "Category",
        properties: [
          { field: "id", type: "number", primary: true, searchable: false },
          { field: "name", type: "string", searchable: true },
          {
            field: "description",
            type: "string",
            optional: true,
            searchable: true,
          },
        ],
        filesToGenerate: [],
      },
    ],
  };

  fs.writeFileSync("crudius.config.json", JSON.stringify(template, null, 2));
  console.log(chalk.green("crudius.config.json file successfully created!"));
}
