function parseInput() {
  const fs = require("fs");

  return fs
    .readFileSync("./day.03.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x);
}

function countTrees(map, dx, dy) {
  return map.reduce(
    (acc, cur) => {
      if (!(acc.x % dx)) {
        if (cur.charAt(acc.y) === "#") {
          acc.count++;
        }

        acc.y = (acc.y + dy) % cur.length;
      }

      acc.x++;

      return acc;
    },
    { x: 0, y: 0, count: 0 }
  ).count;
}

function part1() {
  const map = parseInput();

  return countTrees(map, 1, 3);
}

function part2() {
  const map = parseInput();

  return [
    { dx: 1, dy: 1 },
    { dx: 1, dy: 3 },
    { dx: 1, dy: 5 },
    { dx: 1, dy: 7 },
    { dx: 2, dy: 1 },
  ]
    .map(({ dx, dy }) => countTrees(map, dx, dy))
    .reduce((acc, cur) => ((acc *= cur), acc), 1);
}

exports.part1 = part1;
exports.part2 = part2;
