
console.log("Listing all links");
const linksPattern =
  /!?\[([^\]]*)?\]\(((https?:\/\/)?[A-Za-z0-9\:\/\. ]+)(\"(.+)\")?\)/gm;

const links = [...doc.matchAll(linksPattern)].map((captured) => {
  const type = captured[3] ? "external" : "internal";
  const link =
    type == "external" ? captured[2] : path.resolve(process.cwd(), captured[2]);

  return {
    text: captured[1],
    link,
    valid: type == "external" ? validateUrl(link) : fs.existsSync(link),
    type,
  };
});

// // If type is external, use fetch to check if the link returns 200 (OK)
// // If type is internal, we need to resolve the path using

console.log(links);
