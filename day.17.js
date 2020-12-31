const fs = require("fs");

function parseInput() {
  return fs
    .readFileSync("./day.17.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => x.split(""));
}

function part1() {
  const input = parseInput();
  const cycles = 6;

  const universe = [];

  for (let z = 0; z < 2 * cycles + 1; z++) {
    const layer = [];

    for (let y = 0; y < 2 * cycles + input.length; y++) {
      const row = [];

      for (let x = 0; x < 2 * cycles + input.length; x++) {
        row.push(
          x >= cycles && x < cycles + input.length && y >= cycles && y < cycles + input.length && z === cycles
            ? input[y - cycles][x - cycles]
            : "."
        );
      }

      layer.push(row);
    }

    universe.push(layer);
  }

  function getValue(universe, x, y, z) {
    return x < 0 || y < 0 || z < 0 || z >= universe.length || y >= universe[z].length || x >= universe[z][y].length
      ? null
      : universe[z][y][x];
  }

  function getActiveNeighbors(universe, x, y, z) {
    let count = 0;

    for (let k = -1; k <= 1; k++) {
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          if (i === 0 && j === 0 && k === 0) continue;
          count += getValue(universe, x + i, y + j, z + k) === "#" ? 1 : 0;
        }
      }
    }

    return count;
  }

  function simulate(universe) {
    const clone = JSON.parse(JSON.stringify(universe));

    for (let k = 0; k < universe.length; k++) {
      for (let j = 0; j < universe[k].length; j++) {
        for (let i = 0; i < universe[k][j].length; i++) {
          const neighbors = getActiveNeighbors(clone, i, j, k);

          if (clone[k][j][i] === "#" && (neighbors < 2 || neighbors > 3)) {
            universe[k][j][i] = ".";
          }

          if (clone[k][j][i] === "." && neighbors === 3) {
            universe[k][j][i] = "#";
          }
        }
      }
    }
  }

  for (let i = 0; i < cycles; i++) {
    simulate(universe);
  }

  return universe.flatMap((x) => x.flatMap((x) => x)).filter((x) => x === "#").length;
}

function part2() {
  const input = parseInput();
  const cycles = 6;

  const universe = [];

  for (let w = 0; w < 2 * cycles + 1; w++) {
    const hyperlayer = [];

    for (let z = 0; z < 2 * cycles + 1; z++) {
      const layer = [];

      for (let y = 0; y < 2 * cycles + input.length; y++) {
        const row = [];

        for (let x = 0; x < 2 * cycles + input.length; x++) {
          row.push(
            x >= cycles &&
              x < cycles + input.length &&
              y >= cycles &&
              y < cycles + input.length &&
              z === cycles &&
              w === cycles
              ? input[y - cycles][x - cycles]
              : "."
          );
        }

        layer.push(row);
      }

      hyperlayer.push(layer);
    }

    universe.push(hyperlayer);
  }

  function getValue(universe, x, y, z, w) {
    return x < 0 ||
      y < 0 ||
      z < 0 ||
      w < 0 ||
      w >= universe.length ||
      z >= universe[w].length ||
      y >= universe[w][z].length ||
      x >= universe[w][z][y].length
      ? null
      : universe[w][z][y][x];
  }

  function getActiveNeighbors(universe, x, y, z, w) {
    let count = 0;

    for (let l = -1; l <= 1; l++) {
      for (let k = -1; k <= 1; k++) {
        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            if (i === 0 && j === 0 && k === 0 && l === 0) continue;
            count += getValue(universe, x + i, y + j, z + k, w + l) === "#" ? 1 : 0;
          }
        }
      }
    }

    return count;
  }

  function simulate(universe) {
    const clone = JSON.parse(JSON.stringify(universe));

    for (let l = 0; l < universe.length; l++) {
      for (let k = 0; k < universe[l].length; k++) {
        for (let j = 0; j < universe[l][k].length; j++) {
          for (let i = 0; i < universe[l][k][j].length; i++) {
            const neighbors = getActiveNeighbors(clone, i, j, k, l);

            if (clone[l][k][j][i] === "#" && (neighbors < 2 || neighbors > 3)) {
              universe[l][k][j][i] = ".";
            }

            if (clone[l][k][j][i] === "." && neighbors === 3) {
              universe[l][k][j][i] = "#";
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < cycles; i++) {
    simulate(universe);
  }

  return universe.flatMap((x) => x.flatMap((x) => x.flatMap((x) => x))).filter((x) => x === "#").length;
}

exports.part1 = part1;
exports.part2 = part2;
