function parse(browser = false) {
  let text;

  if (browser) {
    text = document.querySelector("pre").innerText;
  } else {
    const fs = require("fs");
    text = fs.readFileSync("./day.02.input.txt", "utf-8");
  }

  return text.split("\n").filter((x) => x);
}

function part1() {
  let answer = 0;

  parse().forEach((line) => {
    const parts = line.split(" ");

    const [low, high] = parts[0].split("-").map((x) => Number(x));
    const letter = parts[1][0];
    const password = parts[2];

    const occurrences = password.split("").filter((x) => x === letter).length;

    if (occurrences >= low && occurrences <= high) {
      answer++;
    }
  });

  return answer;
}

function part2() {
  let answer = 0;

  parse().forEach((line) => {
    const parts = line.split(" ");

    const [low, high] = parts[0].split("-").map((x) => Number(x));
    const letter = parts[1][0];
    const password = parts[2];

    if ((password[low - 1] === letter ? 1 : 0) + (password[high - 1] === letter ? 1 : 0) === 1) {
      answer++;
    }
  });

  return answer;
}

exports.part1 = part1;
exports.part2 = part2;
