// Part 1

document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => Number(x))
  .forEach((cur1, _, arr1) => {
    arr1.slice(1).forEach((cur2) => {
      if (cur1 + cur2 === 2020) {
        console.log(`${cur1} * ${cur2} = ${cur1 * cur2}`);
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
  .forEach((cur1, _, arr1) => {
    arr1.slice(1).forEach((cur2, _, arr2) => {
      arr2.slice(1).forEach((cur3) => {
        if (cur1 + cur2 + cur3 === 2020) {
          console.log(`${cur1} * ${cur2} * ${cur3} = ${cur1 * cur2 * cur3}`);
          throw 0;
        }
      });
    });
  });
