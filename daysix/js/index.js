import fs, { Stats } from "fs";

const initialStateReal = fs
  .readFileSync("./daysix/input.txt", "utf8")
  .split(",")
  .map((x) => parseInt(x));

const initialStatesTest = [3, 4, 3, 1, 2];


const countReproductions = (initialStates, totalDays, period) => {
  const states = initialStates.map((state) => ({
    startDate: 0,
    startValue: state,
  }));
  for (let i = 1; i < totalDays; i++) {
    const newChildren = [];
    for (let j = 0; j < states.length; j++) {
      const { startDate, startValue } = states[j];
      const firstRepDay = startValue + startDate;
      const daysSinceFirstRep = i - firstRepDay;
      if (daysSinceFirstRep >= 0 && (i - firstRepDay) % period === 0) {
        newChildren.push({
          startDate: i + 1,
          startValue: 8,
        });
      }
    }
    states.push(...newChildren);
  }
  return states.length;
};
export const daySixPartA = () => {
  const result = countReproductions(initialStateReal, 80, 7);
  return result;
};
