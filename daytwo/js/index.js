import fs from "fs";

const toItemInput = (x) => {
  const [direction, lengthstr] = x.split(" ");
  return {
    direction,
    length: parseInt(lengthstr),
  };
};

const inputsTest = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
].map(toItemInput);

const inputsReal = fs
  .readFileSync("./daytwo/input.txt", "utf8")
  .split("\n")
  .map(toItemInput);

const findCoords = (inputs) => {
  const finalCoord = inputs.reduce(
    (acc, curr) => {
      switch (curr.direction) {
        case "forward":
          acc.x += curr.length;
          break;
        case "down":
          acc.y += curr.length;
          break;
        case "up":
          acc.y -= curr.length;
          break;
      }
      return acc;
    },
    { x: 0, y: 0 }
  );
  return finalCoord.x * finalCoord.y;
};

//probably something about polar coordinates here, but i'm not thinking too hard
const findCoordsUsingAim = (inputs) => {
  const finalCoord = inputs.reduce(
    (acc, curr) => {
      switch (curr.direction) {
        case "forward":
          acc.x += curr.length;
          acc.y += acc.aim * curr.length;
          break;
        case "down":
          acc.aim += curr.length;
          break;
        case "up":
          acc.aim -= curr.length;
          break;
      }
      return acc;
    },
    { x: 0, y: 0, aim: 0 }
  );
  return finalCoord.x * finalCoord.y;
};

export const dayTwoPartA = () => findCoords(inputsReal);

export const dayTwoPartB = () => findCoordsUsingAim(inputsReal);
