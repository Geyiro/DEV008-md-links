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
        resolve({
          links: API.handleDirectory(absolutePath),
          isDirectory: true,
        });
      }
      if (stats.isFile()) {
        resolve({ links: API.getLinks(absolutePath), isDirectory: false });
      }
    });
  });
