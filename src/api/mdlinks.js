import { API } from "../api/index.js";
import fs from "node:fs";

export const mdLinks = (pathInput) =>
  new Promise((resolve, reject) => {
    const absolutePath = API.pathToAbsolute(pathInput);
    const isPathValid = API.validPath(absolutePath);

    if (!absolutePath || !isPathValid) {
      return;
    }

    fs.stat(absolutePath, (error, stats) => {
      if (error) {
        console.error(error);
        reject(error);
      }
      if (stats.isDirectory()) {
        resolve(API.handleDirectory(absolutePath));
      }
      if (stats.isFile()) {
        resolve(API.getLinks(absolutePath));
      }
    });
  });
