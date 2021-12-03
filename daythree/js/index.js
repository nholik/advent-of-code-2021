import fs from "fs";

const inputsReal = fs
  .readFileSync("./daythree/input.txt", "utf8")
  .split("\n")
  .map((x) => x.split(''));

const findGreeks = (inputs) => {
  const totalInputs = inputs.length;
  const valsByPosition = inputs.reduce((acc, curr) => {
    for (let i = 0; i < curr.length; i++) {
      acc[i] += parseInt(curr[i]);
    }
    return acc;
  }, new Array(inputs[0].length).fill(0));

  const gammaInputs = valsByPosition.map((x) => (x > totalInputs / 2 ? "1" : "0"));
  const epsilonInputs = gammaInputs.map((x) => (x === "1" ? "0" : "1"));
  const gamma = parseInt(gammaInputs.join(""),2);
  const epsilon = parseInt(epsilonInputs.join(""),2);

  return gamma * epsilon;
};

export const dayThreePartA = () => findGreeks(inputsReal);
