import fs from "node:fs";
import chalk from "chalk";
import nodePath from "node:path";
import { Console } from "node:console";

export const API = {
  // ...get all markdown files from directory//
  getMarkdownFiles: function (arr) {
    const filteredMdFiles = arr.filter((file) => {
      nodePath.extname(file) === ".md";
    });
    if (filteredMdFiles.length === 0) {
      return false;
    }
    return filteredMdFiles.forEach((file) => console.log(file));
  },
  // ...here we do a lot of things if directory//
  handleDirectory: function (args) {
    console.log(
      chalk.underline("Files from directory:"),
      chalk.bgYellow.bold(args.path)
    );

    const dirContents = fs.readdirSync(args.path);
    const mdFiles = this.getMarkdownFiles(dirContents);

    if (mdFiles === false) {
      console.log(
        chalk.red("Cant find any Markdown files in current directory")
      );
    }
    return mdFiles;
  },
  readFile: function (path) {
    return fs.readFile(path, "utf8", (error, file) => {
      if (error) {
        console.log("toy en catch");
        console.log(error);
        return;
      }
      console.log("toy en then");
      console.log("Listing all links");
      const linksPattern =
        /!?\[([^\]]*)?\]\(((https?:\/\/)?[A-Za-z0-9\:\/\. ]+)(\"(.+)\")?\)/gm;
      const links = [...file.matchAll(linksPattern)].map((captured) => {
        const type = captured[3] ? "external" : "internal";
        const link =
          type == "external"
            ? captured[2]
            : path.resolve(process.cwd(), captured[2]);

        return {
          text: captured[1],
          link,
          valid:
            type == "external" ? this.validateUrl(link) : fs.existsSync(link),
          type,
        };
      });
      console.log(links);
    });
  },
  validateUrl: function (urlString) {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  // ...if File proceed to
  handleFile: function (args) {
    const pathArg = args.path;
    const optionArg = args.option;
    console.log(pathArg, optionArg);
    if (nodePath.extname(pathArg) != ".md") {
      console.log(chalk.red("Not a Markdown file"));
    } else {
      this.readFile(pathArg);
    }
  },
};
