import fs from "fs";

const initialStateReal = fs
  .readFileSync("./daysix/input.txt", "utf8")
  .split(",")
  .map((x) => parseInt(x));

const initialStatesTest = [3, 4, 3, 1, 2];

const firstRepoIndex = (currentValue, currentIndex) => {
  return currentValue + currentIndex + 1;
};

const countChildren = (totalIndices, firstRepoIndex) => {
  if (firstRepoIndex >= totalIndices) {
    return 0;
  }
  return 1 + Math.floor((totalIndices - firstRepoIndex - 1) / 7);
};

const cache = new Map();

const totalChildren = (currentValue, currentIndex, totalIndices) => {
  const fri = firstRepoIndex(currentValue, currentIndex);
  let childCount = countChildren(totalIndices, fri);
  if (childCount > 0) {
    const children = [];
    for (let i = fri; i <= totalIndices; i += 7) {
      const child = { currentValue: 8, currentIndex: i };
      const key = toKey(child);
      if (cache.has(key)) {
        childCount += cache.get(key);
      } else {
        children.push(child);
      }
    }

    while (children.length > 0) {
      const child = children.shift();
      const key = toKey(child);

      if (cache.has(key)) {
        childCount += cache.get(key);
      } else {
        const childValue = totalChildren(
          child.currentValue,
          child.currentIndex,
          totalIndices
        );
        cache.set(key, childValue);
        childCount += childValue;
      }
    }
  }
  return childCount;
};

const toKey = (item) => {
  return `${item.currentValue}_${item.currentIndex}`;
};

const countAllChildren = (inputs, totalDays) => {
  let total = 0;
  for (let i = 0; i < inputs.length; i++) {
    const item = { currentValue: inputs[i], currentIndex: 0 };
    const key = toKey(item);
    if (cache.has(key)) {
      total += cache.get(key);
    } else {
      const childCount = totalChildren(inputs[i], 0, totalDays + 1);
      total += childCount;
      total++;
      cache.set(key, childCount + 1);
    }
  }
  return total;
};
export const daySixPartA = () => {
  cache.clear();
  return countAllChildren(initialStateReal, 80);
};

export const daySixPartB = () => {
  cache.clear();
  return countAllChildren(initialStateReal, 256);
};
