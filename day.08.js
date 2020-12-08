function evaluate(instructions) {
  let accumulator = 0;
  let currentIndex = 0;

  while (1) {
    if (currentIndex === instructions.length) {
      return { terminates: true, accumulator };
    }

    const instruction = instructions[currentIndex];

    if (instruction.visited) {
      return { terminates: false, accumulator };
    }

    instruction.visited = true;

    switch (instruction.op) {
      case "nop": {
        currentIndex++;
        break;
      }

      case "acc": {
        accumulator += instruction.arg;
        currentIndex++;
        break;
      }

      case "jmp": {
        currentIndex += instruction.arg;
        break;
      }
    }
  }
}

// Part 1

const instructions = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => ({ op: x.slice(0, 3), arg: Number(x.slice(4)), visited: false }));

const result = evaluate(instructions);

console.log(result.accumulator);

// Part 2

const instructions = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => ({ op: x.slice(0, 3), arg: Number(x.slice(4)), visited: false }));

for (let i = 0; i < instructions.length; i++) {
  const clone = JSON.parse(JSON.stringify(instructions));

  const instruction = clone[i];

  if (instruction.op === "nop") {
    clone.splice(i, 1, { op: "jmp", arg: instruction.arg, visited: false });
  } else if (instruction.op === "jmp") {
    clone.splice(i, 1, { op: "nop", arg: instruction.arg, visited: false });
  }

  const result = evaluate(clone);

  if (result.terminates) {
    console.log(result.accumulator);
    break;
  }
}
