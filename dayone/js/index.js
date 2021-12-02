import fs from "fs";

const inputsReal = fs
  .readFileSync("./dayone/input.txt", "utf8")
  .split("\n")
  .map((x) => parseInt(x, 10));

const inputs_test = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

//wlog we can just look back one step since if  x_i <  x_i+2 we know x_i+1 < x_i+2
const findIncreases = (inputs) => {
  let upticks = 0;
  for (let i = 1; i < inputs.length; i++) {
    const last_depth = inputs[i - 1];
    const curr_depth = inputs[i];
    if (last_depth < curr_depth) {
      upticks++;
    }
  }
  return upticks;
};

export const dayOneA = () => findIncreases(inputsReal);

const findSlidingIncreases = (inputs) => {
  // we want to find when x_n-1 + x_n + x_n+1 < x_n + x_n+1+ x_n+2
  // let y_n-1 and y_n be defined in the obvious way
  // then we count the number of times y_n-1 < y_n
  // or 0 < y_n - y_n-1 -> x_n+x_n+1+x_n+2 - (x_n-1 +x_n+x+n+1) = x_n+2 - x_n-1
  let upticks = 0;
  for (let i = 0; i < inputs.length - 3; i++) {
    const curr_window = inputs[i + 3] - inputs[i];
    if (curr_window > 0) {
      upticks++;
    }
  }
  return upticks;
};

export const dayOneB = () => findSlidingIncreases(inputsReal);
