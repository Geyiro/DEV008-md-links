import fs from "node:fs";
import chalk from "chalk";
import nodePath from "node:path";
import { exit } from "node:process";
import { API } from "../api/index.js";
import { match } from "node:assert";

export const CLI = {
  // ...Given path to absolute//
  pathToAbsolute: function (path) {
    try {
      return nodePath.resolve(path);
    } catch (error) {
      console.error(error);
    }
  },

  // ...Verify if its a valid path//
  validPath: function (path) {
    const valid = fs.existsSync(path);

    if (!valid) {
      console.log(chalk.red("path doesnt exist:") + chalk.red.inverse(path));
    }

    return valid;
  },

  // ...parsing and validating arguments//
  parseArgs: function (argv) {
    const args = argv.slice(2);
    const options = args.filter((arg) => arg.startsWith("--"));
    const paths = args.filter((arg) => !options.includes(arg));

    if (paths.length < 1) {
      throw new Error("Path is required");
    } else if (paths.length > 1) {
      throw new Error("Multiple paths present, only one needed");
    }

    const pathInput = paths[0];    
    const absolutePath = this.pathToAbsolute(pathInput);
    this.validPath(absolutePath);

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
