const fs = require("fs");

function parseInput() {
  return fs
    .readFileSync("./day.07.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => {
      const color = x.split(" ").slice(0, 2).join(" ");

      const contents = [];

      if (!x.includes("no other bags")) {
        const contentParts = x
          .split(" ")
          .slice(4)
          .filter((x) => !x.includes("bag"));

        for (let i = 0; i < contentParts.length; ) {
          contents.push({ color: contentParts.slice(i + 1, i + 3).join(" "), count: Number(contentParts[i]) });
          i += 3;
        }
      }

      return { color, contents };
    });
}

function part1() {
  const rules = parseInput();

  const results = new Set();
  const currentColors = new Set(["shiny gold"]);

  let size = -1;

  while (size !== results.size) {
    size = results.size;

    const bags = rules.filter(({ contents }) => contents.some(({ color }) => currentColors.has(color)));

    currentColors.clear();

    bags.forEach(({ color }) => {
      results.add(color);
      currentColors.add(color);
    });
  }

  return results.size;
}

function part2() {
  const ruleMap = parseInput().reduce((acc, cur) => ((acc[cur.color] = cur.contents), acc), {});

  return (
    (function countBags(name) {
      let count = 1;

      for (const bag of ruleMap[name]) {
        count += bag.count * countBags(bag.color);
      }

      return count;
    })("shiny gold") - 1
  );
}

exports.part1 = part1;
exports.part2 = part2;
