function parseInput() {
  const fs = require("fs");

  return fs
    .readFileSync("./day.25.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => Number(x));
}

function part1() {
  const [cardPublicKey, doorPublicKey] = parseInput();

  let loopSize = 0;
  let value = 1;

  while (value !== cardPublicKey) {
    value = (value * 7) % 20201227;
    loopSize++;
  }

  let encryptionKey = 1;

  for (let i = 0; i < loopSize; i++) {
    encryptionKey = (encryptionKey * doorPublicKey) % 20201227;
  }

  return encryptionKey;
}

function part2() {
  return "N/A";
}

exports.part1 = part1;
exports.part2 = part2;
