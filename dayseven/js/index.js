import fs from "fs";

const inputsReal = fs
  .readFileSync("./dayseven/input.txt", "utf8")
  .split(",")
  .map((x) => parseInt(x));

const inputsTest = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const getTotal = (inputsOrganized, guess) => {
  return inputsOrganized.reduce((acc, curr) => {
    return acc + curr.count * Math.abs(guess - curr.value);
  }, 0);
};
const getIncreasingTotal = (inputsOrganized, guess) => {
  return inputsOrganized.reduce((acc, curr) => {
    const steps = Math.abs(guess - curr.value);
    const price = (steps * (steps + 1)) / 2;
    return acc + curr.count * price;
  }, 0);
};

const findMinimum = (inputs, costFunction) => {
  const inputsOrganized = organizeByCount(inputs);
  const totalNumberValues = inputsOrganized.length;

  let min = costFunction(inputsOrganized, 1);
  let minIndex = 0;
  for (let i = 1; i < totalNumberValues; i++) {
    const total = costFunction(inputsOrganized, i);
    if (total < min) {
      min = total;
      minIndex = i;
    }
  }
  return min;
};
const organizeByCount = (values) => {
  const eltsByCount = [];
  values.forEach((value) => {
    if (eltsByCount[value] === undefined) {
      eltsByCount[value] = 1;
    } else {
      eltsByCount[value] += 1;
    }
  });
  return eltsByCount.reduce((acc, curr, i) => {
    if (curr !== undefined) {
      acc.push({
        value: i,
        count: curr,
      });
    }
    return acc;
  }, []);
};

export const daySevenPartA = () => {
  return findMinimum(inputsReal, getTotal);
};

export const daySevenPartB = () => {
  return findMinimum(inputsReal, getIncreasingTotal);
};
