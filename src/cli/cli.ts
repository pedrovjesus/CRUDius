#!/usr/bin/env node
import { Command } from "commander";
import { runClean } from "./commands/clean";
import { runGenerate } from "./commands/generate";
import { runInit } from "./commands/init";
import { runInitJson } from "./commands/init-json";
import { runValidate } from "./commands/validate";

const program = new Command();

program
  .name("Crudius")
  .description("A CLI tool for managing CRUD operations")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize an interactive CRUD project setup")
  .action(runInit);

program
  .command("init-json")
  .description("Generate a base JSON config for CRUD setup")
  .action(runInitJson);

program
  .command("clean")
  .description("Remove generated files and output artifacts")
  .action(runClean);

program
  .command("validate")
  .description("Validate the crudius.config.json file")
  .action(runValidate);

program
  .command("generate")
  .description("Generate CRUD crudius.config.json file ")
  .action(runGenerate);

program.parse(process.argv);
