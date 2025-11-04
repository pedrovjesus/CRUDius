#!/usr/bin/env node
import { Command } from "commander";
import { runInit } from "./commands/init";
import { runInitJson } from "./commands/init-json";
import chalk from "chalk";

const program = new Command();

program
  .name("Crudius")
  .description("A CLI tool for managing CRUD operations")
  .version("1.0.0");

// Comand: crudius --init
program
  .option("--init", "Initialize a interactive CRUD project setup")
  .option(
    "--init-json",
    "Initialize a CRUD project setup using a JSON configuration file"
  )
  .action((options) => {
    if (options.init) runInit();
    else if (options.initJson) runInitJson();
    else console.log(chalk.yellow("Use --init ou --init-json"));
  });

program.parse(process.argv);
