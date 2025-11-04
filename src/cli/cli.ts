#!/usr/bin/env node
import { Command } from "commander";
import { runInit } from "./commands/init";
import { runInitJson } from "./commands/init-json";
import { runClean } from "./commands/clean";

const program = new Command();

program
  .name("Crudius")
  .description("A CLI tool for managing CRUD operations")
  .version("1.0.0");

// Comand: crudius --init
program
  .command("init")
  .description("Initialize an interactive CRUD project setup")
  .action(runInit);

// Comando: crudius init-json
program
  .command("init-json")
  .description("Generate a base JSON config for CRUD setup")
  .action(runInitJson);

// Comando: crudius clean
program
  .command("clean")
  .description("Remove generated files and output artifacts")
  .action(runClean);

program.parse(process.argv);
