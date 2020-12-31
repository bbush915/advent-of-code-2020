const { time } = require("./utils");

const args = process.argv.slice(2);

function run(day) {
  const { part1, part2 } = require(`./day.${day}`);

  console.log(`----- Day ${day} -----`);

  const { result: part1Answer, elapsed: part1Elapsed } = time(part1);
  console.log(`Part 1: ${part1Answer} [${part1Elapsed} ms]`);

  const { result: part2Answer, elapsed: part2Elapsed } = time(part2);
  console.log(`Part 2: ${part2Answer} [${part2Elapsed} ms]`);
}

if (args[0]) {
  const day = args[0].padStart(2, "0");
  run(day);
} else {
  for (let i = 0; i < 25; i++) {
    if (i > 0) {
      console.log();
    }

    const day = (i + 1).toString().padStart(2, "0");
    run(day);
  }
}
