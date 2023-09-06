# Markdown Links

  
- [Markdown Links](#markdown-links)
  - [1. Prologue](#1-prologue)
  - [2. MdLinks Script](#2-mdlinks-script)
  - [3. Flow Chart](#3-flow-chart)

## 1. Prologue

[Markdown](https://en.wikipedia.org/wiki/Markdown) is a lightweight markup language that is very popular among developers. It is used on many platforms that handle plain text (GitHub, forums, blogs, etc.) and it is very common to find several files in this format in any type of repository (starting with the traditional `README.md`).

These `Markdown` files typically contain _links_ that are often broken or no longer valid, greatly diminishing the value of the information being shared.

Within an open-source community, we have proposed to create a tool using Node.js, which reads and analyzes files in Markdown format to check the links they contain and report some statistics.

## 2. MdLinks Script

Mdlinks is a library developed using Node.js that allows you to read and analyze the links within a Markdown file and returns general information about them, thus reducing the time it would take to verify them manually.

## 3. Flow Chart

CLI flow chart:

  ![./Assets/Diagrama de Flujo MD-LINKS (1).png](https://github.com/Geyiro/DEV008-md-links/blob/main/Assets/CLI.png)

API (mdlinks) flow chart:

  ![./Assets/Diagrama de Flujo MD-LINKS (1).png](https://github.com/Geyiro/DEV008-md-links/blob/main/Assets/MDLINKS.png)

