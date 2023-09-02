import { API } from "../api/index.js";
import fs from "node:fs";

export const mdLinks = (path) =>
  new Promise((resolve, reject) => {
    const absolutePath = API.pathToAbsolute(path);
    const isPathValid = API.validPath(absolutePath);

    if (!isPathValid) {
      reject("Invalid path");
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
