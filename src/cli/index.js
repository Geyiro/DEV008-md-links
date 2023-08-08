import fs from "node:fs";
import chalk from "chalk";
import { exit } from "node:process";
import { API } from "../api/index.js";

export const CLI = {
  validPath: function (path) {
    return fs.existsSync(path);
  },
  parseArgs: function (argv) {
    const args = argv.slice(2);
    const pathInput = args[0];
    const optionInput = args[1].split("--")[1];

    if (!this.validPath(pathInput)) {
      console.log(
        chalk.red("cannot find any file/directory with given path:") +
          chalk.red.inverse(pathInput)
      );

      exit();
    }

    return { path: pathInput, option: optionInput };
  },
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
  start: function () {
    const args = this.parseArgs(process.argv);
    this.handlePath(args);
  },
};
