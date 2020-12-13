const lines = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x);

const timestamp = Number(lines[0]);

const buses = lines[1]
  .split(",")
  .map((x, i) => (x === "x" ? null : { id: Number(x), offset: i }))
  .filter((x) => x);

// Part 1

(function () {
  console.log(
    buses
      .map((x, i) => {
        const wait = Math.ceil(timestamp / Number(x.id)) * Number(x.id) - timestamp;

        return {
          index: i,
          wait,
          value: wait * x.id,
        };
      })
      .sort((x, y) => x.wait - y.wait)[0].value
  );
})();

// Part 2

function normalize(a, p) {
  if (a < 0) {
    const n = -a / p;
    a += (n + 1n) * p;
  }

  return a % p;
}

function inverse(a, p) {
  for (let i = 2; i < p; i++) {
    if ((a * i) % p === 1) return i;
  }
}

function chineseRemainderTheorem(n, a) {
  let x;

  let N = n[0];
  let A = a[0];

  for (let i = 1; i < n.length; i++) {
    let [m1, m2] = bezoutCoefficients(N, n[i]);

    x = A * m2 * n[i] + a[i] * m1 * N;

    N *= n[i];
    A = normalize(x, N);
  }

  return normalize(x, N);
}

function bezoutCoefficients(a, b) {
  const r = [a, b];
  const s = [1n, 0n];
  const t = [0n, 1n];

  let i = 1;

  while (r[i] !== 0n) {
    let q = r[i - 1] / r[i];

    r.push(r[i - 1] - q * r[i]);
    s.push(s[i - 1] - q * s[i]);
    t.push(t[i - 1] - q * t[i]);

    i++;
  }

  return [s[i - 1], t[i - 1]];
}

(function () {
  const head = buses[0];
  const rest = buses.slice(1).sort((x, y) => y.id - x.id);

  const n = rest.map((x) => BigInt(x.id));
  const a = rest.map((x) => BigInt(normalize(BigInt(-x.offset * inverse(head.id, x.id)), BigInt(x.id))));

  const x = chineseRemainderTheorem(n, a);

  console.log(x * BigInt(head.id));
})();
