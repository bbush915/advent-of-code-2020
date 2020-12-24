function parse(browser = false) {
  let text;

  if (browser) {
    text = document.querySelector("pre").innerText;
  } else {
    const fs = require("fs");
    text = fs.readFileSync("./day.01.input.txt", "utf-8");
  }

  return text
    .split("\n")
    .filter((x) => x)
    .map((x) => Number(x));
}

function part1() {
  parse().forEach((x, idx, arr) => {
    arr.slice(idx).forEach((y) => {
      if (x + y === 2020) {
        return x * y;
      }
    });
  });
}

function part2() {
  parse().forEach((x, idx1, arr1) => {
    arr1.slice(idx1).forEach((y, idx2, arr2) => {
      arr2.slice(idx2).forEach((z) => {
        if (x + y + z === 2020) {
          return x * y * z;
        }
      });
    });
  });
}

exports.part1 = part1;
exports.part2 = part2;
