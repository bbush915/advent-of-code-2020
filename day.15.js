function playGame(startingNumbers, maxTurns) {
  const history = startingNumbers.reduce((acc, cur, idx) => ((acc[cur] = [idx, -1]), acc), {});

  let turn = startingNumbers.length;
  let previousNumber = startingNumbers[turn - 1];

  while (turn < maxTurns) {
    const currentNumber = history[previousNumber][1] < 0 ? 0 : history[previousNumber][0] - history[previousNumber][1];
    history[currentNumber] = [turn, history[currentNumber] ? history[currentNumber][0] : -1];

    turn++;
    previousNumber = currentNumber;
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
