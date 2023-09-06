# Markdown Links


## 1. Prologue

Markdown is a lightweight markup language that is very popular among developers. It is used on many platforms that handle plain text (GitHub, forums, blogs, etc.) and it is very common to find several files in this format in any type of repository (starting with the traditional `README.md`).

These `Markdown` files typically contain _links_ that are often broken or no longer valid, greatly diminishing the value of the information being shared.

Within an open-source community, we have proposed to create a tool using Node.js, which reads and analyzes files in Markdown format to check the links they contain and report some statistics.

## 2. MdLinks Script

Mdlinks is a library developed using Node.js that allows you to read and analyze the links within a Markdown file and returns general information about them, thus reducing the time it would take to verify them manually.

## 3. Flow Chart

CLI flow chart:

  ![./Assets/Diagrama de Flujo MD-LINKS (1).png](https://github.com/Geyiro/DEV008-md-links/blob/main/Assets/CLI.png)

API (mdlinks) flow chart:

  ![./Assets/Diagrama de Flujo MD-LINKS (1).png](https://github.com/Geyiro/DEV008-md-links/blob/main/Assets/MDLINKS.png)


## 4. How to use

After downloading the package, you will need to enter `index.js` followed by the path of the file desired to be analysed and the option(s).

![screenshot of welcome message](https://github.com/Geyiro/DEV008-md-links/blob/main/Assets/welcomeCLI.png)

With `index.js` `./markdown/file/path` `--validate` you will get the _text_, _type_(internal or external), _location_(URL), _valid_(can be true or false) and the HTTP response for each link within the file.

![screenshot of --validate](https://github.com/Geyiro/DEV008-md-links/blob/main/Assets/validate_output.png)

With `index.js` `./markdown/file/path` `--stats` you will get the total _number of links_ and the total _number of unique links_.

![screenshot of --stats](https://github.com/Geyiro/DEV008-md-links/blob/main/Assets/stats_output.png)

Also you can input `index.js` `./markdown/file/path` `--stats` `--validate` (or viceversa) to get the total _number of links_, the total _number of unique links_ and the total _number of broken links_.