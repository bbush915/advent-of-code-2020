function input() {
  return document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((x) => x)
    .map((x) => {
      const parts = x.split(" (contains ");

      return {
        ingredients: parts[0].split(" "),
        allergens: parts[1].split(" ").map((x) => x.slice(0, x.length - 1)),
      };
    });
}

function getAllergenMap() {
  return input().reduce((acc, cur) => {
    for (let i = 0; i < cur.allergens.length; i++) {
      const allergen = cur.allergens[i];

      if (!acc[allergen]) {
        acc[allergen] = [...cur.ingredients];
      } else {
        acc[allergen] = cur.ingredients.filter((x) => acc[allergen].findIndex((y) => y === x) > -1);
      }
    }

    return acc;
  }, {});
}

// Part 1

(function () {
  const allergenMap = getAllergenMap();
  const allergens = new Set(Object.values(allergenMap).flatMap((x) => x));

  const result = input().reduce(
    (acc, cur) => ((acc += cur.ingredients.filter((x) => !allergens.has(x)).length), acc),
    0
  );

  console.log(`Part 1: ${result}`);
})();

// Part 2

(function () {
  const allergenMap = getAllergenMap();
  const entries = Object.entries(allergenMap);

  const result = [];

  while (entries.length) {
    entries.sort((x, y) => x[1].length - y[1].length);

    result.push(entries[0]);

    for (let j = 1; j < entries.length; j++) {
      entries[j][1] = entries[j][1].filter((x) => x !== entries[0][1][0]);
    }

    entries.shift();
  }

  console.log(
    `Part 2: ${result
      .sort((x, y) => x[0].localeCompare(y[0]))
      .map((x) => x[1])
      .join(",")}`
  );
})();
