import fs from "fs";

const inputsReal = fs.readFileSync("./dayfive/input.txt", "utf8").split("\n");
const inputsTest = fs
  .readFileSync("./dayfive/input_test.txt", "utf8")
  .split("\n");

const parseCoords = (coordLines) => {
  return coordLines.reduce((acc, coordInput) => {
    const [[x_1, y_1], [x_2, y_2]] = coordInput
      .split(" -> ")
      .map((c) => c.split(","));
    acc.push([parseInt(x_1), parseInt(y_1), parseInt(x_2), parseInt(y_2)]);
    return acc;
  }, []);
};

const findOverlaps = (coordInputs) => {
  const overlaps = []; //arrays in js are really objects and therefore sparse, yay, in this case
  const coordLines = parseCoords(coordInputs);

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
    } else {
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

export const dayFivePartA = () => findOverlaps(inputsReal);
