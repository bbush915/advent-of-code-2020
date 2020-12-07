// Part 1

const rules = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => {
    const color = x.split(" ").slice(0, 2).join("_");

    const contents = [];

    if (!x.includes("no other bags")) {
      const contentParts = x
        .split(" ")
        .slice(4)
        .filter((x) => !x.includes("bag"));

      for (let i = 0; i < contentParts.length; ) {
        contents.push(contentParts.slice(i + 1, i + 3).join("_"));
        i += 3;
      }
    }

    return { color, contents };
  });

const results = new Set();
const currentColors = new Set(["shiny_gold"]);

let size = -1;

while (size !== results.size) {
  size = results.size;

  const containers = rules.filter((x) => x.contents.some((x) => currentColors.has(x)));

  currentColors.clear();

  containers.forEach((x) => {
    results.add(x.color);

    currentColors.add(x.color);
  });
}

console.log(results.size);

// Part 2

const rules = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => {
    const color = x.split(" ").slice(0, 2).join("_");

    const contents = [];

    if (!x.includes("no other bags")) {
      const contentParts = x
        .split(" ")
        .slice(4)
        .filter((x) => !x.includes("bag"));

      for (let i = 0; i < contentParts.length; ) {
        contents.push({ color: contentParts.slice(i + 1, i + 3).join("_"), count: Number(contentParts[i]) });
        i += 3;
      }
    }

    return { color, contents };
  })
  .reduce((acc, cur) => ((acc[cur.color] = cur.contents), acc), {});

console.log(
  (function calculateBags(name) {
    let count = 1;

    for (const bag of rules[name]) {
      count += bag.count * calculateBags(bag.color);
    }

    return count;
  })("shiny_gold") - 1
);
