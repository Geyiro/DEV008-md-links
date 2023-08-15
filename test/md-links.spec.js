import { CLI } from "./src/cli/index.js";
import { expect, test } from "vitest";
import nodePath from "node:path";
import os from "os";

// pathToAbsolute
test("pathToAbsolute should return an absolute path", () => {
  expect(CLI.pathToAbsolute("./examples")).toBe(nodePath.resolve("./examples"));
});

test("pathToAbsolute returns cwd when nothing", () => {
  expect(CLI.pathToAbsolute("")).toBe(process.cwd());
});

test("pathToAbsolute returns undefined", () => {
  expect(CLI.pathToAbsolute()).toBe(undefined);
});

test("pathToAbsolute returns an string", () => {
  expect(CLI.pathToAbsolute("./examples")).toBeTypeOf("string");
});

// validPath
test("validPath returns path if exists", () => {
  expect(CLI.validPath("./examples")).toBe(true);
});

test("if validPath is false", () => {
  expect(CLI.validPath("./ex")).toBe(false);
});

test("validPath returns false if undefined", () => {
  expect(CLI.validPath()).toStrictEqual(false);
});

// test("validPath false consolelogs error", () => {
//   expect(CLI.validPath("./ex")).toStrictEqual("path doesnt exist:./ex");
// });

test("validPath is boolean", () => {
  expect(CLI.validPath()).toBeTypeOf("boolean");
});

// paserArgs (parse Arguments)
test("paseArgs returns an array with path(absolute) and the option name", () => {
  expect(
    CLI.parseArgs([
      nodePath.join(os.homedir(), ".asdf/installs/nodejs/20.0.0/bin/node"),
      nodePath.resolve("./index.js"),
      "./examples",
      "--hello",
    ])
  ).toStrictEqual({
    path: nodePath.resolve("./examples"),
    option: "--hello",
  });
});

test("paseArgs needs a path", () => {
  expect(() =>
    CLI.parseArgs([
      nodePath.join(os.homedir(), ".asdf/installs/nodejs/20.0.0/bin/node"),
      nodePath.resolve("./index.js"),
      "--hello",
    ])
  ).toThrowError("Path is required");
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

// test("", () => {
//   expect(CLI.parseArgs()).toBe();
// });
