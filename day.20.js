const fs = require("fs");

function parseInput() {
  return fs
    .readFileSync("./day.20.input.txt", "utf-8")
    .split("\n\n")
    .filter((x) => x)
    .map((x) => {
      const lines = x.split("\n");

      return {
        id: Number(lines[0].slice(5, lines[0].length - 1)),
        data: lines.slice(1).map((x) => x.split("")),
      };
    });
}

function getEdges(tile) {
  return [
    tile.data[0],
    tile.data.map((x) => x[x.length - 1]),
    tile.data[tile.data.length - 1].slice(0).reverse(),
    tile.data.map((x) => x[0]).reverse(),
  ];
}

function compareEdges(x, y) {
  const xEdges = getEdges(x);
  const yEdges = getEdges(y);

  const matches = [];

  for (let i = 0; i < xEdges.length; i++) {
    for (let j = 0; j < yEdges.length; j++) {
      if (
        xEdges[i].every((val, idx) => val === yEdges[j][idx]) ||
        xEdges[i].every((val, idx) => val === yEdges[j][yEdges[j].length - idx - 1])
      ) {
        matches.push({ i, j });
      }
    }
  }

  return matches;
}

function part1() {
  const tiles = parseInput();

  const matchMap = tiles.map((x) => x.id).reduce((acc, cur) => ((acc[cur] = []), acc), {});

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const matches = compareEdges(tiles[i], tiles[j]);

      if (matches.length) {
        matchMap[tiles[i].id].push(tiles[j].id);
        matchMap[tiles[j].id].push(tiles[i].id);
      }
    }
  }

  return Object.entries(matchMap).reduce((acc, [key, value]) => ((acc *= value.length === 2 ? key : 1), acc), 1);
}

function makeArray(size) {
  const result = [];

  for (let i = 0; i < size; i++) {
    result.push(Array(size).fill(null));
  }

  return result;
}

function flip(data) {
  return data.reverse();
}

function rotate(data) {
  const size = data.length;

  const result = makeArray(size);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[i][j] = data[j][size - i - 1];
    }
  }

  return result;
}

function fit(tile, current, desired) {
  for (let i = 0; i < 8; i++) {
    if (desired.every((val, idx) => val === undefined || current[idx] === val)) {
      return { tile, adjacent: current };
    }

    tile.data = rotate(tile.data);

    const temp = current.shift();
    current.push(temp);

    if (i === 3) {
      tile.data = flip(tile.data);

      const temp = current[0];
      current[0] = current[2];
      current[2] = temp;
    }
  }
}

function assembleImage(tiles) {
  const size = Math.sqrt(tiles.length);

  const matchMap = tiles.reduce(
    (acc, cur) => ((acc[cur.id] = { tile: cur, adjacent: [null, null, null, null] }), acc),
    {}
  );

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const matches = compareEdges(tiles[i], tiles[j]);

      for (const match of matches) {
        matchMap[tiles[i].id].adjacent[match.i] = tiles[j].id;
        matchMap[tiles[j].id].adjacent[match.j] = tiles[i].id;
      }
    }
  }

  const tileImage = makeArray(size);

  const anchor = Object.values(matchMap).find((x) => x.adjacent.filter((x) => x).length === 2);
  tileImage[0][0] = fit(anchor.tile, anchor.adjacent, [null, undefined, undefined, null]);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i === 0 && j === 0) continue;

      if (i === 0) {
        const previous = tileImage[i][j - 1];
        const current = matchMap[previous.adjacent[1]];

        tileImage[i][j] = fit(current.tile, current.adjacent, [
          null,
          j === size - 1 ? null : undefined,
          undefined,
          previous.tile.id,
        ]);
      } else {
        const previous = tileImage[i - 1][j];
        const current = matchMap[previous.adjacent[2]];

        tileImage[i][j] = fit(current.tile, current.adjacent, [
          tileImage[i - 1][j].tile.id,
          j === size - 1 ? null : undefined,
          i === size - 1 ? null : undefined,
          j === 0 ? null : tileImage[i][j - 1].tile.id,
        ]);
      }
    }
  }

  const image = makeArray(size * (tiles[0].data.length - 2));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const data = tileImage[i][j].tile.data;

      for (let x = 1; x < data.length - 1; x++) {
        for (let y = 1; y < data.length - 1; y++) {
          image[i * (data.length - 2) + x - 1][j * (data.length - 2) + y - 1] = data[x][y];
        }
      }
    }
  }

  return image;
}

function findMonsters(image) {
  const monster = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " "],
    ["#", " ", " ", " ", " ", "#", "#", " ", " ", " ", " ", "#", "#", " ", " ", " ", " ", "#", "#", "#"],
    [" ", "#", " ", " ", "#", " ", " ", "#", " ", " ", "#", " ", " ", "#", " ", " ", "#", " ", " ", " "],
  ];

  let count = 0;

  for (let i = 0; i < image.length - (monster.length - 1); i++) {
    for (let j = 0; j < image.length - (monster[0].length - 1); j++) {
      let found = true;

      for (let y = 0; y < monster.length; y++) {
        for (let x = 0; x < monster[y].length; x++) {
          if (monster[y][x] === "#" && image[i + y][j + x] !== "#") {
            found = false;
          }
        }
      }

      if (found) {
        count++;
      }
    }
  }

  return count;
}

function part2() {
  const tiles = parseInput();

  let image = assembleImage(tiles);

  let monsters = 0;

  for (let i = 0; i < 8; i++) {
    monsters = findMonsters(image);

    if (monsters > 0) {
      break;
    }

    image = rotate(image);

    if (i === 3) {
      image = flip(image);
    }
  }

  return image.flatMap((x) => x).filter((x) => x === "#").length - monsters * 15;
}

exports.part1 = part1;
exports.part2 = part2;
