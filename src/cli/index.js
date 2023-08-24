import fs from "node:fs";
import chalk from "chalk";
import { exit } from "node:process";
import { API } from "../api/index.js";


export const CLI = {
  // ...parsing and validating arguments//
  parseArgs: function (argv) {
    const args = argv.slice(2);
    const options = args.filter((args) => args.startsWith("--"));
    const paths = args.filter((arg) => !options.includes(arg));

    if (paths.length < 1) {
      throw new Error(chalk.red("Path is required"));
    } else if (paths.length > 1) {
      throw new Error(chalk.red("Multiple paths present, only one needed"));
    }

    if (options != '--validate'){
      throw new Error(chalk.red("Not a valid option"));
    }
    const pathInput = paths[0];    
    const absolutePath = API.pathToAbsolute(pathInput);
    API.validPath(absolutePath);

    return { path: absolutePath, option: options[0] };
  },
  // ...Uses the API functions to handle if Directory or File//
  handleArgs: function (args) {
    fs.stat(args.path, (error, stats) => {
      if (error) {
        console.error(error);
        exit();
      }

      if (stats.isDirectory()) {
        API.handleDirectory(args);
      }

      if (stats.isFile()) {
        API.handleFile(args);
      }
    });
  },

  // ...Function that starts de CLI in index.js//
  start: function () {
    const args = this.parseArgs(process.argv);
    this.handleArgs(args);
  },
};
