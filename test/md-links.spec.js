import { CLI } from "./src/cli/index.js";
import { API } from "./src/api/index.js";
import { expect, test } from "vitest";
import nodePath from "node:path";
import os from "os";

// pathToAbsolute
test("pathToAbsolute should return an absolute path", () => {
  expect(API.pathToAbsolute("./examples")).toBe(nodePath.resolve("./examples"));
});

test("pathToAbsolute returns cwd when nothing", () => {
  expect(API.pathToAbsolute("")).toBe(process.cwd());
});

test("pathToAbsolute returns undefined", () => {
  expect(API.pathToAbsolute()).toBe(undefined);
});

test("pathToAbsolute returns an string", () => {
  expect(API.pathToAbsolute("./examples")).toBeTypeOf("string");
});

// validPath
test("validPath returns path if exists", () => {
  expect(API.validPath("./examples")).toBe(true);
});

test("if validPath is false", () => {
  expect(API.validPath("./ex")).toBe(false);
});

test("validPath returns false if undefined", () => {
  expect(API.validPath()).toStrictEqual(false);
});

test("validPath is boolean", () => {
  expect(API.validPath()).toBeTypeOf("boolean");
});

// paserArgs (parse Arguments)
test("paseArgs manages input args from user and gives them back if correct", () => {
  expect(
    CLI.parseArgs([
      nodePath.join(os.homedir(), ".asdf/installs/nodejs/20.0.0/bin/node"),
      nodePath.resolve("./index.js"),
      "./examples",
      "--hello",
    ])
  ).toStrictEqual({
    options: ["--hello"],
    path: "./examples",
  });
});

test("paseArgs only needs one path", () => {
  expect(() =>
    CLI.parseArgs([
      nodePath.join(os.homedir(), ".asdf/installs/nodejs/20.0.0/bin/node"),
      nodePath.resolve("./index.js"),
      nodePath.resolve("./examples"),
      nodePath.resolve("./testingDoc.md"),
      "--hello",
    ])
  ).toThrowError("Multiple paths present, only one needed");
});

// handleDirectory (when the path is a directory)

test("handleDirectory returns an object of md files when path is Dir", () => {
  expect(API.handleDirectory(nodePath.resolve("./examples"))).toBeTypeOf("object");
});

test("When handleDirectory cant find any md files", () => {
  expect(() => API.handleDirectory("./test")).toThrowError(
    "Cant find any markdown file in CURRENT DIRECTORY"
  );
});

// getLinks 

test("getLinks returns an object", () => {
  expect(API.getLinks("...")).toBeTypeOf("object");
});

test("getLinks only reads a .md file", () => {
  expect(API.getLinks("./index.js")).toBe(null);
});

test("getLinks returns all links caontained in a .md file", () => {
  expect(API.getLinks("./testingDoc.md")).toBe(null);
});



