import inquirer from "inquirer";
import fs, { createWriteStream } from "fs";
import chalk from "chalk";
import { GenerationService } from "../../core/GenerationService";
import { RootConfig } from "../../interfaces/rootConfig.interface";
import { IGenerationConfig } from "../../interfaces/generationConfig.interface";
import { IProperty } from "../../interfaces/property.interface";
import { IFileGenerate } from "../../interfaces/fileGenerate.interface";

export async function runInit() {
  console.log(
    chalk.blueBright.bold("🚀 Welcome to the Crudius initialization wizard!")
  );
  console.log(chalk.gray("Let's configure your CRUD entities step by step.\n"));

  const generationConfigs: IGenerationConfig[] = [];

  let addAnotherEntity = true;

  while (addAnotherEntity) {
    const { entityName } = await inquirer.prompt<{ entityName: string }>([
      {
        type: "input",
        name: "entityName",
        message: chalk.cyan("Entity name:"),
        validate: (input) =>
          input.trim() !== "" || "Entity name cannot be empty.",
      },
    ]);

    const properties: IProperty[] = [];

    properties.push({
      field: "id",
      type: "number",
      primary: true,
      isOptional: false,
    });

    console.log(
      chalk.gray(
        `\nAutomatically added default field: ${chalk.yellow(
          "id (primary key)"
        )}`
      )
    );
    console.log(
      chalk.gray(
        `\nNow, let's define the other fields for ${chalk.yellow(entityName)}\n`
      )
    );

    let addAnotherProperty = true;

    while (addAnotherProperty) {
      const { field, type, optional, moreFields } = await inquirer.prompt<{
        field: string;
        type: string;
        optional: boolean;
        moreFields: boolean;
      }>([
        {
          type: "input",
          name: "field",
          message: "Field name:",
          validate: (input) => {
            const name = input.trim();
            if (name === "") return "Field name cannot be empty.";
            if (name.toLowerCase() === "id")
              return "The 'id' field is already created automatically.";
            return true;
          },
        },
        {
          type: "list",
          name: "type",
          message: "Field type:",
          choices: ["string", "number", "boolean", "date"],
        },
        {
          type: "confirm",
          name: "optional",
          message: "Is this field optional?",
          default: false,
        },
        {
          type: "confirm",
          name: "moreFields",
          message: "Add another field?",
          default: false,
        },
      ]);

      const property: IProperty = {
        field,
        type: type as "string" | "number" | "boolean",
        primary: false,
        isOptional: optional,
      };

      properties.push(property);
      addAnotherProperty = moreFields;
    }

    const filesToGenerate: IFileGenerate[] = [];

    const entityConfig: IGenerationConfig = {
      entityName,
      properties,
      filesToGenerate,
    };

    generationConfigs.push(entityConfig);
    console.log(chalk.green(`Entity "${entityName}" added successfully!\n`));

    const { moreEntities } = await inquirer.prompt<{ moreEntities: boolean }>([
      {
        type: "confirm",
        name: "moreEntities",
        message: "Add another entity?",
        default: false,
      },
    ]);

    addAnotherEntity = moreEntities;
  }

  const config: RootConfig = { generationConfigs };

  // 💾 Save JSON for user reference
  fs.writeFileSync("crudius.config.json", JSON.stringify(config, null, 2));
  console.log(chalk.green("\n Configuration saved to crudius.config.json\n"));

  const { shouldGenerate } = await inquirer.prompt<{ shouldGenerate: boolean }>(
    [
      {
        type: "confirm",
        name: "shouldGenerate",
        message: "Do you want to generate the code now?",
        default: true,
      },
    ]
  );

  if (shouldGenerate) {
    console.log(chalk.cyan("\n Generating code..."));

    const output = createWriteStream("crudius-output.zip");
    const generator = new GenerationService("typescript");

    try {
      await generator.generateArchive(config, output);
      console.log(
        chalk.green("\n Code generated and saved as crudius-output.zip\n")
      );
    } catch (err) {
      console.error(chalk.red("\n Error while generating code:\n"), err);
    }
  } else {
    console.log(chalk.yellow("\n You can generate the code later using:"));
    console.log(chalk.white("   crudius generate\n"));
  }
}
