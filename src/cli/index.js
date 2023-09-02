import fs from "node:fs";
import chalk from "chalk";
import { API } from "../api/index.js";
import { mdLinks } from "../api/mdlinks.js";

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

    return { path: paths[0], options };
  },

  // ...Function that starts de CLI in index.js//
  start: function () {
    const args = this.parseArgs(process.argv);
    const stats = args.options.includes("--stats");
    const validate = args.options.includes("--validate");
    // mdLinks(args.path).then((links) => {
    if (validate && !stats) {
      mdLinks(args.path).then((links) => {
        console.log("estoy en validate");
        // const linksValidations = links.map((link) => API.validateLink(link));
        links.forEach((link) => console.log(link));
        // Promise.all(linksValidations).then((results) =>
        //   results.forEach((result) => console.log(result))
        // );
      });
    } else if (stats && !validate) {
      console.log("estoy en stats");
    } else if ((stats && validate) || (validate && stats)) {
      console.log("estoy en stats + valid");
    }
    // });
  },
};
