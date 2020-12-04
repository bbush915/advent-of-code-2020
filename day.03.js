// Part 1

[{ dx: 1, dy: 3 }]
  .map(
    ({ dx, dy }) =>
      document
        .querySelector("pre")
        .innerText.split("\n")
        .filter((x) => x)
        .reduce(
          (acc, cur) => {
            if (!(acc.x % dx)) {
              if (cur.charAt(acc.y) === "#") acc.count++;
              acc.y = (acc.y + dy) % cur.length;
            }
            acc.x++;
            return acc;
          },
          { x: 0, y: 0, count: 0 }
        ).count
  )
  .reduce((acc, cur) => (acc = acc * cur), 1);

// Part 2

[
  { dx: 1, dy: 1 },
  { dx: 1, dy: 3 },
  { dx: 1, dy: 5 },
  { dx: 1, dy: 7 },
  { dx: 2, dy: 1 },
]
  .map(
    ({ dx, dy }) =>
      document
        .querySelector("pre")
        .innerText.split("\n")
        .filter((x) => x)
        .reduce(
          (acc, cur) => {
            if (!(acc.x % dx)) {
              if (cur.charAt(acc.y) === "#") acc.count++;
              acc.y = (acc.y + dy) % cur.length;
            }
            acc.x++;
            return acc;
          },
          { x: 0, y: 0, count: 0 }
        ).count
  )
  .reduce((acc, cur) => (acc = acc * cur), 1);
