// Part 1

const differences = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => Number(x))
  .sort((x, y) => x - y)
  .map((x, i, arr) => x - (arr[i - 1] || 0));

differences.push(3);

console.log(differences.filter((x) => x === 3).length * differences.filter((x) => x === 1).length);

// Part 2

differences
  .map((x, i, arr) => (x === 3 || arr[i + 1] === 3 ? 0 : 1))
  .reduce(
    (acc, cur) => {
      if (cur) {
        acc[acc.length - 1]++;
      } else {
        acc.push(0);
      }
      return acc;
    },
    [0]
  )
  .map((x) => {
    switch (x) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 4;
      case 3:
        return 7;
    }
  })
  .reduce((acc, cur) => ((acc *= cur), acc), 1);
