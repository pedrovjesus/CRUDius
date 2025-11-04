#!/usr/bin/env node
import { Command } from "commander";
import { runInit } from "./commands/init";
import { runInitJson } from "./commands/init-json";

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

  
program.parse(process.argv);
