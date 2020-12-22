function input() {
  return document
    .querySelector("pre")
    .innerText.split("\n\n")
    .map((x) =>
      x
        .split("\n")
        .filter((x) => x)
        .slice(1)
        .map((x) => Number(x))
    );
}

function combat(p1, p2) {
  while (p1.length && p2.length) {
    const p1Card = p1.shift();
    const p2Card = p2.shift();

    if (p1Card > p2Card) {
      p1.push(p1Card, p2Card);
    } else {
      p2.push(p2Card, p1Card);
    }
  }

  return [p1, p2];
}

function recursiveCombat(p1, p2) {
  const p1History = [];
  const p2History = [];

  while (p1.length && p2.length) {
    if (
      p1History.find((x) => x.length === p1.length && x.every((val, idx) => val === p1[idx])) ||
      p2History.find((x) => x.length === p2.length && x.every((val, idx) => val === p2[idx]))
    ) {
      p2.length = 0;
      return [p1, p2];
    } else {
      p1History.push(p1.slice(0));
      p2History.push(p2.slice(0));
    }

    const p1Card = p1.shift();
    const p2Card = p2.shift();

    if (p1.length < p1Card || p2.length < p2Card) {
      if (p1Card > p2Card) {
        p1.push(p1Card, p2Card);
      } else {
        p2.push(p2Card, p1Card);
      }
    } else {
      const results = recursiveCombat(p1.slice(0, p1Card), p2.slice(0, p2Card));

      if (results[0].length) {
        p1.push(p1Card, p2Card);
      } else {
        p2.push(p2Card, p1Card);
      }
    }
  }

  return [p1, p2];
}

// Part 1

(function () {
  const [p1, p2] = input();

  const results = combat(p1, p2);
  const winner = results[0].length === 0 ? p2 : p1;

  const answer = winner.reduce((acc, cur, idx) => ((acc += cur * (winner.length - idx)), acc), 0);
  console.log(`Part 1: ${answer}`);
})();

// Part 2

(function () {
  const [p1, p2] = input();

  const results = recursiveCombat(p1, p2);
  const winner = results[0].length === 0 ? p2 : p1;

  const answer = winner.reduce((acc, cur, idx) => ((acc += cur * (winner.length - idx)), acc), 0);
  console.log(`Part 2: ${answer}`);
})();
