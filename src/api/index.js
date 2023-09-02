import fs from "node:fs";
import chalk from "chalk";
import nodePath from "node:path";

const linksPattern =
  /!?\[([^\]]*)?\]\(((https?:\/\/)?[A-Za-z0-9\:\/\.\_]+)(\"(.+)\")?\)/gm;

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

  // ...here we do a lot of things if directory//
  handleDirectory: function (directoryPath) {
    console.log(
      chalk.underline("Files from directory:"),
      chalk.bgYellow.bold(directoryPath)
    );

    const filesInDir = fs.readdirSync(directoryPath);
    return filesInDir.filter((file) => nodePath.extname(file) === ".md");
  },
  // ...get all URLS in current markdown file//
  // Given a filePath, getLinks returns Promise<Link[]>.
  // If the file extension is not a .md, it returns null instead.
  getLinks: function (filePath) {
    if (nodePath.extname(filePath) != ".md") {
      console.log(chalk.red("Not a Markdown file"));
      return null;
    }

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (error, file) => {
        if (error) {
          console.log(error);
          reject(error);
        }

        const linksFound = file.matchAll(linksPattern);

        resolve(
          [...linksFound].map((captured) => {
            const type = captured[3] ? "external" : "internal";
            const location = captured[2];

            return {
              text: captured[1],
              type,
              location,
            };
          })
        );
      });
    });
  },
  // ...resolve and return internal link path//
  validateInternalLink: function (link) {
    const location = nodePath.resolve(process.cwd(), link.location);
    return new Promise((resolve) => {
      resolve({ ...link, location, valid: this.validPath(location) });
    });
  },
  // ...validates external URLS//
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
};
