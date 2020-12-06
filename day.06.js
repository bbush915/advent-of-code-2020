// Part 1

document
  .querySelector("pre")
  .innerText.split("\n\n")
  .map((x) => new Set(x.replaceAll("\n", "")).size)
  .reduce((acc, cur) => ((acc += cur), acc), 0);

// Part 2

document
  .querySelector("pre")
  .innerText.split("\n\n")
  .map(
    (x) =>
      x
        .split("\n")
        .filter((x) => x)
        .map((x) => {
          const src = x.split("");
          const ref = "abcdefghijklmnopqrstuvwxyz".split("");

          return parseInt(ref.map((x) => (src.includes(x) ? "1" : "0")).join(""), 2);
        })
        .reduce((acc, cur) => ((acc &= cur), acc), Math.pow(2, 26) - 1)
        .toString(2)
        .split("")
        .filter((x) => Number(x)).length
  )
  .reduce((acc, cur) => ((acc += cur), acc), 0);
