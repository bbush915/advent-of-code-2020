const fs = require("fs");

function parseInput() {
  const documentParts = fs.readFileSync("./day.16.input.txt", "utf-8").split("\n\n");

  const fields = documentParts[0].split("\n").reduce((acc, cur) => {
    const fieldParts = cur.split(": ");

    const name = fieldParts[0];
    const ranges = fieldParts[1].split(" or ").map((x) => x.split("-").map((x) => Number(x)));

    acc[name] = ranges;

    return acc;
  }, {});

  const ticket = documentParts[1]
    .split("\n")[1]
    .split(",")
    .map((x) => Number(x));

  const nearbyTickets = documentParts[2]
    .split("\n")
    .filter((x) => x)
    .slice(1)
    .map((x) => x.split(",").map((x) => Number(x)));

  return {
    fields,
    ticket,
    nearbyTickets,
  };
}

function isValid(value, field) {
  return (value >= field[0][0] && value <= field[0][1]) || (value >= field[1][0] && value <= field[1][1]);
}

function isInvalid(value, fields) {
  return Object.values(fields).every((field) => !isValid(value, field));
}

function part1() {
  const { fields, nearbyTickets } = parseInput();

  return nearbyTickets.reduce((acc, cur) => {
    cur.forEach((value) => {
      acc += isInvalid(value, fields) ? value : 0;
    });

    return acc;
  }, 0);
}

function part2() {
  const { fields, ticket, nearbyTickets } = parseInput();

  const validTickets = nearbyTickets.filter((x) => x.every((value) => !isInvalid(value, fields)));

  const fieldPossibilities = [];

  for (const field in fields) {
    const possibilities = [];

    for (let i = 0; i < Object.keys(fields).length; i++) {
      if (validTickets.every((x) => isValid(x[i], fields[field]))) {
        possibilities.push(i);
      }
    }

    fieldPossibilities.push({ field, possibilities });
  }

  fieldPossibilities.sort((x, y) => x.possibilities.length - y.possibilities.length);

  let result = 1;
  const handled = [];

  for (let i = 0; i < fieldPossibilities.length; i++) {
    const filtered = fieldPossibilities[i].possibilities.filter((x) => handled.findIndex((y) => x === y) < 0);

    handled.push(filtered[0]);

    if (fieldPossibilities[i].field.startsWith("departure")) {
      result *= ticket[filtered[0]];
    }
  }

  return result;
}

exports.part1 = part1;
exports.part2 = part2;
