// Part 1

document
  .querySelector("pre")
  .innerText.split("\n\n")
  .filter((x) => x)
  .map((x) => new Set(x.split("").filter((x) => x !== "\n")).size)
  .reduce((acc, cur) => ((acc += cur), acc), 0);

// Part 2

document
  .querySelector("pre")
  .innerText.split("\n\n")
  .filter((x) => x)
  .map((x) =>
    x.split("\n").map((x) => {
      const src = x.split("");
      const ref = "abcdefghiijklmnopqrstuvwxyz".split("");

      return parseInt(ref.map((x) => (src.includes(x) ? "1" : "0")).join(""), 2);
    })
  )
  .reduce((acc, cur) => {
    const and = cur.reduce((acc, cur) => ((acc &= cur), acc), Math.pow(2, 26) - 1);

    acc += and
      .toString(2)
      .split("")
      .filter((x) => x === "1").length;

    return acc;
  }, 0);
