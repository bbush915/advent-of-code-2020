function parseInput() {
  const fs = require("fs");

  return fs
    .readFileSync("./day.05.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => parseInt(x.replace(/(B|R)/g, "1").replace(/(F|L)/g, "0"), 2));
}

function part1() {
  return Math.max(...parseInput());
}

function part2() {
  return (
    parseInput()
      .sort()
      .map((val, idx, arr) => ({ val, gap: val - (arr[idx - 1] || 0) }))
      .find((x) => x.gap === 2).val - 1
  );
}

exports.part1 = part1;
exports.part2 = part2;
