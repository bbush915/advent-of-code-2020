function parse() {
  const fs = require("fs");

  return fs
    .readFileSync("./day.01.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => Number(x));
}

function part1() {
  let answer;

  parse().forEach((x, idx, arr) => {
    arr.slice(idx).forEach((y) => {
      if (x + y === 2020) {
        answer = x * y;
        return;
      }
    });

    if (answer) return;
  });

  return answer;
}

function part2() {
  let answer;

  parse().forEach((x, idx1, arr1) => {
    arr1.slice(idx1).forEach((y, idx2, arr2) => {
      arr2.slice(idx2).forEach((z) => {
        if (x + y + z === 2020) {
          answer = x * y * z;
          return;
        }
      });

      if (answer) return;
    });

    if (answer) return;
  });

  return answer;
}

exports.part1 = part1;
exports.part2 = part2;
