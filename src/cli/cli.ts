#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .name("Crudius")
  .description("A CLI application built with Commander.js")
  .version("1.0.0");

program.parse();
