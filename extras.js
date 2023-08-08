import path from "node:path";
import { URL } from "node:url";

//______________________________
// ...Turning a path to absolute
//___________________________...

const pathInputToAbsolute = path.isAbsolute(pathInput)
  ? pathInput
  : path.resolve(pathInput);
// function pathInputToAbsolute(route) {
//   if (path.isAbsolute(route)) {
//     return path;
//   } else {
//     return path.resolve(route);
//   }
// }
//______________________________
// ......Verify if path is valid
//___________________________...

// console.log("Listing all links");
// const linksPattern =
//   /!?\[([^\]]*)?\]\(((https?:\/\/)?[A-Za-z0-9\:\/\. ]+)(\"(.+)\")?\)/gm;

// const links = [...doc.matchAll(linksPattern)].map((captured) => {
//   const type = captured[3] ? "external" : "internal";
//   const link =
//     type == "external" ? captured[2] : path.resolve(process.cwd(), captured[2]);

//   return {
//     text: captured[1],
//     link,
//     valid: type == "external" ? validateUrl(link) : fs.existsSync(link),
//     type,
//   };
// });

function validateUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// // If type is external, use fetch to check if the link returns 200 (OK)
// // If type is internal, we need to resolve the path using

// console.log(links);
