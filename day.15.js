function playGame(startingNumbers, maxTurns) {
  let turn = startingNumbers.length;
  let previousNumber = startingNumbers.pop();

  const history = startingNumbers.reduce((acc, cur, idx) => (acc.set(cur, idx + 1), acc), new Map());

  while (turn < maxTurns) {
    const currentNumber = history.get(previousNumber) ? turn - history.get(previousNumber) : 0;

    history.set(previousNumber, turn);

    previousNumber = currentNumber;
    turn++;
  }

  return previousNumber;
}

function part1() {
  const startingNumbers = [2, 1, 10, 11, 0, 6];
  return playGame(startingNumbers, 2020);
}

function part2() {
  const startingNumbers = [2, 1, 10, 11, 0, 6];
  return playGame(startingNumbers, 30000000);
}

exports.part1 = part1;
exports.part2 = part2;
