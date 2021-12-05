import fs from "fs";

const inputsReal = fs.readFileSync("./dayfive/input.txt", "utf8").split("\n");
const inputsTest = fs
  .readFileSync("./dayfive/input_test.txt", "utf8")
  .split("\n");

const parseCoords = (coordLines, selector) => {
  return coordLines
    .reduce((acc, coordInput) => {
      const [[x_1, y_1], [x_2, y_2]] = coordInput
        .split(" -> ")
        .map((c) => c.split(","));
      acc.push([parseInt(x_1), parseInt(y_1), parseInt(x_2), parseInt(y_2)]);
      return acc;
    }, [])
    .filter(selector);
};

const findOverlaps = (coordLines) => {
  const overlaps = []; //arrays in js are really objects and therefore sparse, yay, in this case

  coordLines.forEach((coord) => {
    const [x_1, y_1, x_2, y_2] = coord;
    if (overlaps[y_1] === undefined) {
      overlaps[y_1] = [];
    }
    if (x_1 === x_2) {
      const y_end = Math.max(y_1, y_2);
      for (let y = Math.min(y_1, y_2); y <= y_end; y++) {
        if (overlaps[y] === undefined) {
          overlaps[y] = [];
        }
        overlaps[y][x_1] = (overlaps[y][x_1] || 0) + 1;
      }
    } else if (y_1 === y_2) {
      const x_end = Math.max(x_1, x_2);
      for (let x = Math.min(x_1, x_2); x <= x_end; x++) {
        overlaps[y_1][x] = (overlaps[y_1][x] || 0) + 1;
      }
    } else if (Math.abs(x_1 - x_2) === Math.abs(y_1 - y_2)) {
      //yes it's assumed all inputs are diag otherwise, but this is in better taste
      const start_x = Math.min(x_1, x_2);
      const end_x = Math.max(x_1, x_2);
      let y = start_x === x_1 ? y_1 : y_2;
      const isIncreasing = y < (end_x === x_1 ? y_1 : y_2);
     
      for (let x = start_x; x <= end_x; x++) {
        if (overlaps[y] === undefined) {
          overlaps[y] = [];
        }
        overlaps[y][x] = (overlaps[y][x] || 0) + 1;
        if (isIncreasing) y++;
        else y--;
      }
    }
  });
  return overlaps.reduce((acc, curr) => {
    if (curr !== undefined) {
      acc += curr.reduce((acc, curr) => {
        if ((curr || 0) > 1) {
          acc++;
        }
        return acc;
      }, 0);
      return acc;
    }
  }, 0);
};

export const dayFivePartA = () =>
  findOverlaps(
    parseCoords(
      inputsReal,
      (line) => line[0] === line[2] || line[1] === line[4]
    )
  );

export const dayFivePartB = () =>
  findOverlaps(parseCoords(inputsReal, () => true));
