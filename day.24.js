function parse() {
  return document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((x) => x)
    .map((x) => x.match(/(e|se|sw|w|nw|ne)/g));
}

function getCoordinates(directions) {
  let x = 0;
  let y = 0;

  const directionToOffsetMap = {
    e: [1, 0],
    se: [0, 1],
    sw: [-1, 1],
    w: [-1, 0],
    nw: [0, -1],
    ne: [1, -1],
  };

  for (const direction of directions) {
    const [dx, dy] = directionToOffsetMap[direction];

    x += dx;
    y += dy;
  }

  return [x, y];
}

function makeArray(size) {
  const result = [];

  for (let i = 0; i < size; i++) {
    result.push(Array(size).fill(null));
  }

  return result;
}

function getFloor() {
  const list = parse();

  const size = 151;
  const offset = Math.floor(size / 2);

  const floor = makeArray(size);

  for (const directions of list) {
    const [x, y] = getCoordinates(directions);
    floor[x + offset][y + offset] = !!!floor[x + offset][y + offset];
  }

  return floor;
}

function countAdjacent(floor, x, y) {
  return [
    getValue(floor, x + 1, y),
    getValue(floor, x, y + 1),
    getValue(floor, x - 1, y + 1),
    getValue(floor, x - 1, y),
    getValue(floor, x, y - 1),
    getValue(floor, x + 1, y - 1),
  ].filter((x) => x).length;
}

function getValue(floor, x, y) {
  return x < 0 || y < 0 || x > floor.length - 1 || y > floor.length - 1 ? null : floor[x][y];
}

function simulate(floor) {
  const clone = JSON.parse(JSON.stringify(floor));

  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor.length; j++) {
      const adjacent = countAdjacent(clone, i, j);

      if ((floor[i][j] && (adjacent === 0 || adjacent > 2)) || (!floor[i][j] && adjacent == 2)) {
        floor[i][j] = !floor[i][j];
      }
    }
  }
}

// Part 1

(function () {
  const list = parse();

  const tiles = {};

  for (const directions of list) {
    const [x, y] = getCoordinates(directions);
    tiles[`${x}|${y}`] = !!!tiles[`${x}|${y}`];
  }

  const answer = Object.values(tiles).filter((x) => x).length;
  console.log(`Part 1: ${answer}`);
})();

// Part 2

(function () {
  const floor = getFloor();

  for (let i = 0; i < 100; i++) {
    simulate(floor);
  }

  const answer = floor.flatMap((x) => x).filter((x) => x).length;
  console.log(`Part 2: ${answer}`);
})();
