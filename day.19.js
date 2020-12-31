const fs = require("fs");

function parseInput() {
  const sections = fs.readFileSync("./day.19.input.txt", "utf-8").split("\n\n");

  return {
    rules: sections[0]
      .split("\n")
      .map((x) => ({
        number: Number(x.slice(0, x.search(":"))),
        subRules: x
          .slice(x.search(":") + 2)
          .split(" | ")
          .map((x) => (x === '"a"' || x === '"b"' ? x.replace(/\"/g, "") : x.split(" ").map((x) => Number(x)))),
      }))
      .reduce((acc, cur) => ((acc[cur.number] = cur.subRules), acc), {}),
    messages: sections[1].split("\n").filter((x) => x),
  };
}

function cartesianProduct(x, y) {
  if (x.length === 0) {
    return y;
  }

  if (y.length === 0) {
    return x;
  }

  const result = [];

  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < y.length; j++) {
      result.push(x[i].concat(y[j]));
    }
  }

  return result;
}

function explode(rules, ruleNumber) {
  const rule = rules[ruleNumber];

  if (!Number.isInteger(rule[0][0])) {
    return [rule[0][0]];
  }

  const possibilities = [];

  for (const subRule of rule) {
    let subPossibilities = [];

    for (const subRuleNumber of subRule) {
      subPossibilities = cartesianProduct(subPossibilities, explode(rules, subRuleNumber));
    }

    subPossibilities.forEach((x) => possibilities.push(x));
  }

  return possibilities;
}

function getInclusionIndices() {
  const { rules, messages } = parseInput();

  const frontPossibilities = explode(rules, 42);
  const backPossibilities = explode(rules, 31);

  return messages
    .map((x) =>
      x
        .split("")
        .reduce((acc, cur, idx) => {
          if (idx % 8 === 0) {
            acc.push([cur]);
          } else {
            acc[acc.length - 1].push(cur);
          }

          return acc;
        }, [])
        .map((x) => x.join(""))
    )
    .map((x) => ({
      front: x.findIndex((x) => !frontPossibilities.includes(x)),
      back: x.reverse().findIndex((x) => !backPossibilities.includes(x)),
      length: x.length,
    }));
}

function part1() {
  return getInclusionIndices().filter((x) => x.front === 2 && x.back === 1 && x.length === 3).length;
}

function part2() {
  return getInclusionIndices().filter(
    (x) => x.front > 0 && x.back > 0 && x.front > x.back && x.front + x.back === x.length
  ).length;
}

exports.part1 = part1;
exports.part2 = part2;
