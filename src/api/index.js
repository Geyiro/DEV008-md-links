import fs from "node:fs";
import chalk from "chalk";
import path from "node:path";

export const API = {
  // ...show files if path is directory//
  getMarkdownFiles: function (args) {
    args.filter((file) => {
      return path.extname(file.name) === ".md";
    });
  },
  handleDirectory: function (args) {
    console.log(
      chalk.underline("Files from directory:"),
      chalk.bgYellow.bold(args.path)
    );

    const dirContents = fs.readdirSync(args.path);
    const filteredMdFiles = dirContents.filter((file) => {
      return path.extname(file) === ".md";
    });
    filteredMdFiles.forEach((file) => console.log(file));
  },

  // ...if File proceed to
  handleFile: function (args) {
    console.log("Soy file");
  },
};
