const fs = require("fs");

function parseInput() {
  return fs
    .readFileSync("./day.21.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => {
      const parts = x.split(" (contains ");

      return {
        ingredients: parts[0].split(" "),
        allergens: parts[1].split(" ").map((x) => x.slice(0, x.length - 1)),
      };
    });
}

function getAllergenIngredientMap() {
  return parseInput().reduce((acc, cur) => {
    for (const allergen of cur.allergens) {
      if (!acc[allergen]) {
        acc[allergen] = [...cur.ingredients];
      } else {
        acc[allergen] = cur.ingredients.filter((x) => acc[allergen].findIndex((y) => y === x) > -1);
      }
    }

    return acc;
  }, {});
}

function part1() {
  const allergens = new Set(Object.values(getAllergenIngredientMap()).flatMap((x) => x));
  return parseInput().reduce((acc, cur) => ((acc += cur.ingredients.filter((x) => !allergens.has(x)).length), acc), 0);
}

function part2() {
  const result = [];

  const entries = Object.entries(getAllergenIngredientMap());

  while (entries.length) {
    entries.sort((x, y) => x[1].length - y[1].length);

    result.push(entries[0]);

    for (const entry of entries.slice(1)) {
      entry[1] = entry[1].filter((x) => x !== entries[0][1][0]);
    }

    entries.shift();
  }

  return result
    .sort((x, y) => x[0].localeCompare(y[0]))
    .map((x) => x[1])
    .join(",");
}

exports.part1 = part1;
exports.part2 = part2;
