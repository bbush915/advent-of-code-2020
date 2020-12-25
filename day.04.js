function parseInput() {
  const fs = require("fs");

  return fs
    .readFileSync("./day.04.input.txt", "utf-8")
    .split("\n\n")
    .map((x) =>
      x
        .replace(/\n/g, " ")
        .split(" ")
        .filter((x) => x)
        .reduce((acc, cur) => {
          const [key, val] = cur.split(":");
          acc[key] = val;
          return acc;
        }, {})
    );
}

function part1() {
  return parseInput().reduce(
    (acc, cur) => ((acc += Object.keys(cur).length === 8 || (Object.keys(cur).length === 7 && !cur.cid) ? 1 : 0), acc),
    0
  );
}

function part2() {
  return parseInput().reduce((acc, cur) => {
    let valid = true;

    if (!cur.byr || !cur.byr.match(/^\d{4}$/) || Number(cur.byr) < 1920 || Number(cur.byr) > 2002) {
      valid = false;
    }

    if (!cur.iyr || !cur.iyr.match(/^\d{4}$/) || Number(cur.iyr) < 2010 || Number(cur.iyr) > 2020) {
      valid = false;
    }

    if (!cur.eyr || !cur.eyr.match(/^\d{4}$/) || Number(cur.eyr) < 2020 || Number(cur.eyr) > 2030) {
      valid = false;
    }

    if (!cur.hgt) {
      valid = false;
    } else {
      const match = cur.hgt.match(/^(?<value>\d+)(?<units>(cm|in))$/);

      if (match) {
        const { value, units } = match.groups;

        if (units === "cm") {
          valid &= value >= 150 && value <= 193;
        } else if (units === "in") {
          valid &= value >= 59 && value <= 76;
        } else {
          valid = false;
        }
      } else {
        valid = false;
      }
    }

    if (!cur.hcl || !cur.hcl.match(/^#[0-9a-f]{6}$/)) {
      valid = false;
    }

    if (!cur.ecl || !cur.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) {
      valid = false;
    }

    if (!cur.pid || !cur.pid.match(/^\d{9}$/)) {
      valid = false;
    }

    acc += valid ? 1 : 0;

    return acc;
  }, 0);
}

exports.part1 = part1;
exports.part2 = part2;
