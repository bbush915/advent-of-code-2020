function input() {
  const sections = document.querySelector("pre").innerText.split("\n\n");

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

// Part 1 & 2

(function () {
  const { rules, messages } = input();

  const frontPossibilities = explode(rules, 42);
  const backPossibilities = explode(rules, 31);

  const inclusionIndices = messages
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

  const part1 = inclusionIndices.filter((x) => x.front === 2 && x.back === 1 && x.length === 3).length;

  console.log(`Part 1: ${part1}`);

  const part2 = inclusionIndices.filter(
    (x) => x.front > 1 && x.back > 0 && x.front > x.back && x.front + x.back === x.length
  ).length;

  console.log(`Part 2: ${part2}`);
})();
