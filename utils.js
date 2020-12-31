function time(func) {
  const start = new Date().getTime();

  const result = func();

  return { elapsed: new Date().getTime() - start, result };
}

function manhattanDistance(x, y) {
  return Math.abs(x) + Math.abs(y);
}

function normalize(a, p) {
  if (a < 0) {
    const n = Math.floor(-a / p);
    a += (n + 1) * p;
  }

  return a % p;
}

function modularInverse(a, p) {
  for (let i = 1; i < p; i++) {
    if ((a * i) % p === 1) {
      return i;
    }
  }
}

function chineseRemainderTheorem(m, a) {
  const M = m.reduce((acc, cur) => ((acc *= cur), acc), 1);

  let x = 0;

  for (let i = 0; i < m.length; i++) {
    x += normalize(a[i] * (M / m[i]) * modularInverse(M / m[i], m[i]), M);
  }

  return normalize(x, M);
}

exports.time = time;
exports.manhattanDistance = manhattanDistance;
exports.normalize = normalize;
exports.modularInverse = modularInverse;
exports.chineseRemainderTheorem = chineseRemainderTheorem;
