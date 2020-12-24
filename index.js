const globalStart = new Date().getTime();

for (let i = 0; i < 2; i++) {
  const localStart = new Date().getTime();
  const day = (i + 1).toString().padStart(2, "0");

  console.log(`--- Day ${day} ---`);

  const { part1, part2 } = require(`./day.${day}`);

  console.log(`Part 1: ${part1()}, `);
  console.log(`Part 2: ${part2()}, `);

  console.log(`Totals: ${(new Date().getTime() - localStart) / 1000} ms`);
}

console.log(`\nTotal Length: ${(new Date().getTime() - globalStart) / 1000} ms`);
