function playGame(startingNumbers, maxTurns) {
  let turn = startingNumbers.length;
  let previousNumber = startingNumbers.pop();

  const history = startingNumbers.reduce((acc, cur, idx) => ((acc[cur] = idx + 1), acc), {});

  while (turn < maxTurns) {
    const currentNumber = history[previousNumber] ? turn - history[previousNumber] : 0;

    history[previousNumber] = turn;

    previousNumber = currentNumber;
    turn++;
  }

  return previousNumber;
}

// Part 1

(function () {
  const startingNumbers = [2, 1, 10, 11, 0, 6];
  const maxTurns = 2020;

  const result = playGame(startingNumbers, maxTurns);

  console.log(`Part 1: ${result}`);
})();

// Part 2

(function () {
  const startingNumbers = [2, 1, 10, 11, 0, 6];
  const maxTurns = 30000000;

  const result = playGame(startingNumbers, maxTurns);

  console.log(`Part 2: ${result}`);
})();
