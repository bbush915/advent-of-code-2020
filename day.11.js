const grid = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => x.split(""));

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

function cloneGrid(grid) {
  return JSON.parse(JSON.stringify(grid));
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
  while (1) {
    x += dx;
    y += dy;

    if (x < 0 || y < 0 || x >= grid.length || y >= grid[x].length) {
      return "";
    } else if (grid[x][y] === "#" || grid[x][y] === "L") {
      return grid[x][y];
    }
  }
}

// Part 1

const grid1 = cloneGrid(grid);

while (simulate(grid1, countAdjacentNeighbors, 4));

console.log(grid1.flatMap((x) => x).filter((x) => x === "#").length);

// Part 2

const grid2 = cloneGrid(grid);

while (simulate(grid2, countVisibleNeighbors, 5));

console.log(grid2.flatMap((x) => x).filter((x) => x === "#").length);
