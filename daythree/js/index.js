import fs from "fs";

const inputsReal = fs
  .readFileSync("./daythree/input.txt", "utf8")
  .split("\n")
  .map((x) => x.split(""));

const testInputs = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
].map((x) => x.split(""));

const findGreeks = (inputs) => {
  const totalInputs = inputs.length;
  return inputs
    .reduce((acc, curr) => {
      for (let i = 0; i < curr.length; i++) {
        acc[i] += parseInt(curr[i]);
      }
      return acc;
    }, new Array(inputs[0].length).fill(0))
    .reduce(
      (acc, curr) => {
        return curr >= totalInputs / 2
          ? [acc[0] + "1", acc[1] + "0"]
          : [acc[0] + "0", acc[1] + "1"];
      },
      ["", ""]
    );
};

const findRatings = (inputs) => {
  const [ox, co] = inputs[0].reduce(
    (candidates, _, index) => {
      const [oxcandidate, cocandidates, currgamma, currepsilon] = candidates;
      const gammaAtIndex = currgamma[index];
      const epsilonAtIndex = currepsilon[index];

      const newOxCandidate =
        oxcandidate.length === 1
          ? oxcandidate
          : oxcandidate.filter((x) => x[index] === gammaAtIndex);

      const newcocandidates =
        cocandidates.length === 1
          ? cocandidates
          : cocandidates.filter((x) => x[index] === epsilonAtIndex);
      const [nextgamma] = findGreeks(newOxCandidate);
      const [__, nextepsilon] = findGreeks(newcocandidates);
      return [newOxCandidate, newcocandidates, nextgamma, nextepsilon];
    },
    [inputs, inputs, ...findGreeks(inputs)]
  );

  const oxVal = ox[0].join("");
  const coVal = co[0].join("");
  return parseInt(oxVal, 2) * parseInt(coVal, 2);
};

export const dayThreePartA = () => {
  const [g, e] = findGreeks(inputsReal);
  return parseInt(g, 2) * parseInt(e, 2);
};

export const dayThreePartB = () => {
  return findRatings(inputsReal);
};
