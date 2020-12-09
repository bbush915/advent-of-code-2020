// Part 1

document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => Number(x))
  .forEach((x, i, arr1) => {
    arr1.slice(i).forEach((y) => {
      if (x + y === 2020) {
        console.log(`${x} * ${y} = ${x * y}`);
        throw 0;
      }
    });
  });

// Part 2

document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => Number(x))
  .forEach((x, idx1, arr1) => {
    arr1.slice(idx1).forEach((y, idx2, arr2) => {
      arr2.slice(idx2).forEach((z) => {
        if (x + y + z === 2020) {
          console.log(`${x} * ${y} * ${z} = ${x * y * z}`);
          throw 0;
        }
      });
    });
  });
