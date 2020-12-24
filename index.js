function timed(func) {
  const start = new Date().getTime();

  const result = func();

  return [result, new Date().getTime() - start];
}

let total = 0;

for (let i = 0; i < 3; i++) {
  const day = (i + 1).toString().padStart(2, "0");

  console.log(`----- Day ${day} -----`);

  const { part1, part2 } = require(`./day.${day}`);

  const [part1Answer, part1Time] = timed(part1);
  total += part1Time;

  console.log(`Part 1: ${part1Answer}`);
  console.log(`Timing: ${part1Time} ms`);

  const [part2Answer, part2Time] = timed(part2);
  total += part2Time;

  console.log(`Part 2: ${part2Answer}`);
  console.log(`Timing: ${part2Time} ms`);
}
