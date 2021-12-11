import fs from "fs";
//part a
//In the output values, how many times do digits 1, 4, 7, or 8 appear?
//1 has two unique values
//4 has 4 unique values
//7 has 3 unique values
//8 has 7 unique values

const parseFile = (fileName) => {
  return fs
    .readFileSync(fileName, "utf8")
    .split("\n")
    .reduce((acc, curr) => {
      const [_, rest] = curr.split("|");
      acc.push(rest.trim().split(" "));
      return acc;
    }, []);
};

const inputsTest = parseFile("./dayeight/inputtest.txt", "utf8");
const inputsReal = parseFile("./dayeight/input.txt", "utf8");

const digitToSizeMap = new Map([
  [1, 2],
  [4, 4],
  [7, 3],
  [8, 7],
]);

const sizeTodigitMap = new Map([
  [2, 1],
  [4, 4],
  [3, 7],
  [7, 8],
]);

const digitCount = (inputs) => {
  return inputs.reduce((acc, curr) => {
    return (
      acc +
      curr.reduce((acc, curr) => {
        return acc + (sizeTodigitMap.has(curr.length) ? 1 : 0);
      }, 0)
    );
  }, 0);
};
export const dayEightPartA = () => {
  return digitCount(inputsReal);
};
