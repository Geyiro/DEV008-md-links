import fs from "node:fs";
import chalk from "chalk";
import nodePath from "node:path";

export const API = {
  // ...Verify if its a valid path//
  validPath: function (path) {
    const valid = fs.existsSync(path);
    if (!valid) {
      console.log(chalk.red("path doesnt exist:") + chalk.red.inverse(path));
    }
    return valid;
  },
  // ...Given path to absolute//
  pathToAbsolute: function (path) {
    try {
      return nodePath.resolve(path);
    } catch (error) {
      console.error(error);
    }
  },
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
  getLinks: function (file) {
    const linksPattern =
      /!?\[([^\]]*)?\]\(((https?:\/\/)?[A-Za-z0-9\:\/\.\_]+)(\"(.+)\")?\)/gm;

    return [...file.matchAll(linksPattern)].map((captured) => {
      const type = captured[3] ? "external" : "internal";
      const location = captured[2];

      return {
        text: captured[1],
        type,
        location,
      };
    });
  },

  validateInternalLink: function (link) {
    const location = nodePath.resolve(process.cwd(), link.location);
    return new Promise((resolve) => {
      resolve({ ...link, location, valid: this.validPath(location) });
    });
  },

  validateExternalLink: function (link) {
    try {
      const url = new URL(link.location);
      return fetch(url, { signal: AbortSignal.timeout(2 * 1000) })
        .then((response) => {
          return {
            ...link,
            valid: response.status >= 200 && response.status < 300,
            status: response.status,
          };
        })
        .catch((e) => {
          return new Promise((resolve) => {
            resolve({ ...link, valid: false, status: e.message });
          });
        });
    } catch (e) {
      console.log(e);
      return new Promise((resolve) => {
        resolve({ ...link, valid: false, status: "URL invalid" });
      });
    }
  },
  validateLink: function (link) {
    return link.type === "internal"
      ? this.validateInternalLink(link)
      : this.validateExternalLink(link);
  },

  // ...if File proceed to
  handleFile: function (args) {
    const pathArg = args.path;
    const optionArg = args.option;
    console.log(pathArg, optionArg);
    if (nodePath.extname(pathArg) != ".md") {
      console.log(chalk.red("Not a Markdown file"));
    } else {
      fs.readFile(pathArg, "utf8", (error, file) => {
        if (error) {
          console.log(error);
          return;
        }

        const links = this.getLinks(file);

        if (links.length === 0) {
          console.log("No links :( ");
          return;
        }

        const linksValidations = links.map((link) => this.validateLink(link));

        Promise.all(linksValidations).then((results) =>
          results.forEach((result) => console.log(result))
        );
      });
    }
  },
};
