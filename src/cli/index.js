import fs from "node:fs";
import chalk from "chalk";
import nodePath from "node:path";
import { exit } from "node:process";
import { API } from "../api/index.js";

export const CLI = {
  // ...Given path to absolute//
  pathToAbsolute: function (path) {
    return nodePath.resolve(path);
  },

  // ...Verify if its a valid path//
  validPath: function (path) {
    return fs.existsSync(path);
  },

  // ...parsing and validating arguments//
  parseArgs: function (argv) {
    const args = argv.slice(2);
    const pathInput = args[0];
    const optionInput = args[1].split("--")[1];

    const absolutePath = this.pathToAbsolute(pathInput);

    if (!this.validPath(absolutePath)) {
      console.log(
        chalk.red("path doesnt exist:") + chalk.red.inverse(absolutePath)
      );

      exit();
    }

    return { path: absolutePath, option: optionInput };
  },

  // ...Uses the API functions to handle if Directory or File//
  handlePath: function (args) {
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
    this.handlePath(args);
  },
};
