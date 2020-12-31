const fs = require("fs");

function parseInput() {
  return fs.readFileSync("./day.06.input.txt", "utf-8").split("\n\n");
}

function part1() {
  return parseInput()
    .map((x) => new Set(x.replace(/\n/g, "")).size)
    .reduce((acc, cur) => ((acc += cur), acc), 0);
}

function part2() {
  return parseInput()
    .map(
      (x) =>
        x
          .split("\n")
          .filter((x) => x)
          .map((x) => {
            const src = x.split("");
            const ref = "abcdefghijklmnopqrstuvwxyz".split("");

            return parseInt(ref.map((x) => (src.includes(x) ? "1" : "0")).join(""), 2);
          })
          .reduce((acc, cur) => ((acc &= cur), acc), Math.pow(2, 26) - 1)
          .toString(2)
          .split("")
          .filter((x) => Number(x)).length
    )
    .reduce((acc, cur) => ((acc += cur), acc), 0);
}

exports.part1 = part1;
exports.part2 = part2;
