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
      console.log(
        chalk.blue.bold(`
      
                        ╔═════════════════════════════════════════╗
                        ║      Lets get started with Md-Links     ║
                        ╚═════════════════════════════════════════╝
      `)
      );
      console.log(
        chalk.blueBright(
          `
      ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
      ┃                                                                                ┃
      ┃           First you gotta input the path thats going to be analized            ┃
      ┃                                                                                ┃
      ┃                      ` +
            "➥ Md-Links" +
            "   " +
            chalk.bgBlue.bold("./path") +
            "   " +
            chalk.bgCyan.bold("--option") +
            `                            ┃
      ┃                                                                                ┃
      ┃     for options:                                                               ┃
      ┃  --validate: If you want to check each individual link status                  ┃
      ┃  --stats: Gives an overall statistic of the links                              ┃
      ┃  --stats --validate: Returns how many broken links are + general statistics    ┃
      ┃                                                                                ┃
      ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`
        )
      );
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
        links.forEach((link) => {
          API.validateLink(link)
            .then((validLink) => console.log(validLink))
            .catch((error) => console.error(error));
        });
      });
    } else if (stats && !validate) {
      mdLinks(args.path)
        .then((links) => {
          console.log(chalk.blue.bold(`\n${"TOTAL :"}`) + ` ${links.length}`);
          console.log(
            chalk.blue.bold(`${"UNIQUE :"}`) + ` ${API.uniqueStats(links)}`
          );
        })
        .catch((error) => console.error(error));
    } else if ((stats && validate) || (validate && stats)) {
      mdLinks(args.path).then((links) => {
        console.log(chalk.blue.bold(`\n${"TOTAL :"}`) + ` ${links.length}`);
        console.log(
          chalk.blue.bold(`${"UNIQUE :"}`) + ` ${API.uniqueStats(links)}`
        );

        API.brokenLinks(links)
          .then((brokenCount) =>
            console.log(
              chalk.red.bold(`${"BROKEN :"}`) + chalk.red(` ${brokenCount}`)
            )
          )
          .catch((error) => console.error(error));
      });
    }
    // });
  },
};
