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
const findMinimum = (inputs) => {
  const inputsOrganized = organizeByCount(inputs);
  const [sumAllValues, totalNumberValues] = inputsOrganized.reduce(
    (acc, curr) => {
      return [acc[0] + curr.value * curr.count, acc[1] + curr.count];
    },
    [0, 0]
  );

  let min = sumAllValues;
  let minIndex = 0;
  for (let i = 1; i < totalNumberValues; i++) {
    const total = getTotal(inputsOrganized, i);
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
  return eltsByCount
    .reduce((acc, curr, i) => {
      if (curr !== undefined) {
        acc.push({
          value: i,
          count: curr,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      if (a.count === b.count) {
        return b.value - a.value;
      }
      return b.count - a.count;
    });
};
export const daySevenPartA = () => {
  return findMinimum(inputsReal);
};
