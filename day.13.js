const fs = require("fs");
const { chineseRemainderTheorem, modularInverse, normalize } = require("./utils");

function parseInput() {
  const lines = fs.readFileSync("./day.13.input.txt", "utf-8").split("\n");

  return {
    timestamp: Number(lines[0]),
    buses: lines[1]
      .split(",")
      .map((x, i) => (x === "x" ? null : { id: Number(x), offset: i }))
      .filter((x) => x),
  };
}

function part1() {
  const { timestamp, buses } = parseInput();

  return buses
    .map((bus, i) => {
      const wait = Math.ceil(timestamp / bus.id) * bus.id - timestamp;

      return {
        index: i,
        wait,
        value: wait * bus.id,
      };
    })
    .sort((x, y) => x.wait - y.wait)[0].value;
}

function part2() {
  const { buses } = parseInput();

  const head = buses[0];
  const rest = buses.slice(1).sort((x, y) => y.id - x.id);

  const m = rest.map((x) => x.id);
  const a = rest.map((x) => normalize(-x.offset * modularInverse(head.id, x.id), x.id));

  return chineseRemainderTheorem(m, a) * head.id;
}

exports.part1 = part1;
exports.part2 = part2;
