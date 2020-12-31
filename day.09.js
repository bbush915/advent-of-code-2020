const fs = require("fs");

function parseInput() {
  return fs
    .readFileSync("./day.09.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => Number(x));
}

function canAnyTwoSum(numbers, value) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const x = numbers[i];
      const y = numbers[j];

      if (x + y === value) {
        return true;
      }
    }
  }

  return false;
}

function part1() {
  const numbers = parseInput();
  const possibilities = numbers.slice(0, 25);

  for (let i = 25; i < numbers.length; i++) {
    const value = numbers[i];

    if (!canAnyTwoSum(possibilities, value)) {
      return value;
    }

    possibilities.shift();
    possibilities.push(value);
  }
}

function canAnyContiguousRangeSum(numbers, value, size) {
  const range = numbers.slice(0, size);

  for (let i = size; i < numbers.length; i++) {
    const sum = range.reduce((acc, cur) => ((acc += cur), acc), 0);

    if (sum === value) {
      return [true, range];
    } else {
      const difference = sum - value;
      const firstValue = range.shift();

      if (difference > 0 && difference < firstValue) {
        return [false];
      }

      range.push(numbers[i]);
    }
  }

  return [false];
}

function part2() {
  const numbers = parseInput();
  const value = 177777905;

  for (let i = 2; i < numbers.length; i++) {
    const [success, range] = canAnyContiguousRangeSum(numbers, value, i);

    if (success) {
      return Math.min(...range) + Math.max(...range);
    }
  }
}

exports.part1 = part1;
exports.part2 = part2;
