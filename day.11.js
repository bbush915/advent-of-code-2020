const fs = require("fs");

function parseInput() {
  return fs
    .readFileSync("./day.11.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => x.split(""));
}

function cloneGrid(grid) {
  return JSON.parse(JSON.stringify(grid));
}

function simulate(grid, strategy, threshold) {
  const clone = cloneGrid(grid);

  let changed = false;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const occupiedNeighbors = strategy(clone, x, y);

      switch (clone[x][y]) {
        case "L": {
          if (!occupiedNeighbors) {
            grid[x][y] = "#";
            changed = true;
          }

          break;
        }

        case "#": {
          if (occupiedNeighbors >= threshold) {
            grid[x][y] = "L";
            changed = true;
          }

          break;
        }
      }
    }
  }

  return changed;
}

function countOccupied(grid) {
  return grid.flatMap((x) => x).filter((x) => x === "#").length;
}

function countAdjacentNeighbors(grid, x, y) {
  return [
    getValue(grid, x - 1, y - 1),
    getValue(grid, x - 1, y),
    getValue(grid, x - 1, y + 1),
    getValue(grid, x, y - 1),
    getValue(grid, x, y + 1),
    getValue(grid, x + 1, y - 1),
    getValue(grid, x + 1, y),
    getValue(grid, x + 1, y + 1),
  ].filter((x) => x === "#").length;
}

function getValue(grid, x, y) {
  return x < 0 || y < 0 || x >= grid.length || y >= grid[x].length ? "" : grid[x][y];
}

function part1() {
  const grid = parseInput();

  while (simulate(grid, countAdjacentNeighbors, 4));

  return countOccupied(grid);
}

function countVisibleNeighbors(grid, x, y) {
  return [
    getVisibleValue(grid, x, y, -1, -1),
    getVisibleValue(grid, x, y, -1, 0),
    getVisibleValue(grid, x, y, -1, 1),
    getVisibleValue(grid, x, y, 0, -1),
    getVisibleValue(grid, x, y, 0, 1),
    getVisibleValue(grid, x, y, 1, -1),
    getVisibleValue(grid, x, y, 1, 0),
    getVisibleValue(grid, x, y, 1, 1),
  ].filter((x) => x === "#").length;
}

function getVisibleValue(grid, x, y, dx, dy) {
  while (true) {
    x += dx;
    y += dy;

    if (x < 0 || y < 0 || x >= grid.length || y >= grid[x].length) {
      return "";
    } else if (grid[x][y] === "#" || grid[x][y] === "L") {
      return grid[x][y];
    }
  }
}

function part2() {
  const grid = parseInput();

  while (simulate(grid, countVisibleNeighbors, 5));

  return countOccupied(grid);
}

exports.part1 = part1;
exports.part2 = part2;
