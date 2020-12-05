// Part 1

Math.max(
  ...document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((x) => x)
    .map((x) => parseInt(x.replaceAll(/(B|R)/g, "1").replaceAll(/(F|L)/g, "0"), 2))
);

// Part 2

document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => parseInt(x.replaceAll(/(B|R)/g, "1").replaceAll(/(F|L)/g, "0"), 2))
  .sort()
  .map((val, idx, arr) => (idx === 0 ? { val, del: 1 } : { val, del: val - arr[idx - 1] }))
  .find((x) => x.del === 2).val - 1;
