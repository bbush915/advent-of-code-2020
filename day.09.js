const numbers = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => Number(x));

// Part 1

function canAnyTwoSum(possibilities, value) {
  for (let i = 0; i < possibilities.length; i++) {
    for (let j = i + 1; j < possibilities.length; j++) {
      const x = possibilities[i];
      const y = possibilities[j];

      if (x + y === value) {
        return true;
      }
    }
  }

  return false;
}

let part1 = 0;
const possibilities = numbers.slice(0, 25);

for (let i = 25; i < numbers.length; i++) {
  const value = numbers[i];

  if (!canAnyTwoSum(possibilities, value)) {
    console.log(value);
    part1 = value;
    break;
  }

  possibilities.shift();
  possibilities.push(numbers[i]);
}

// Part 2

function canAnyContiguousRangeSum(numbers, size, value) {
  const range = numbers.slice(0, size);

  for (let i = size; i < numbers.length; i++) {
    const sum = range.reduce((acc, cur) => ((acc += cur), acc), 0);

    if (sum === value) {
      console.log(Math.min(...range) + Math.max(...range));
      return true;
    } else {
      const difference = sum - value;
      const firstValue = range.shift();

      if (difference > 0 && difference < firstValue) {
        return false;
      }

      range.push(numbers[i]);
    }
  }

  return false;
}

for (let i = 2; i < numbers.length; i++) {
  if (canAnyContiguousRangeSum(numbers, i, part1)) break;
}
