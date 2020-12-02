// Part 1

document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .forEach((line) => {
    const parts = line.split(" ");

    const [low, high] = parts[0].split("-").map((x) => Number(x));
    const letter = parts[1][0];
    const password = parts[2];

    const occurrences = password.split("").filter((x) => x === letter).length;

    if (occurrences >= low && occurrences <= high) {
      console.log("valid");
    }
  });

// Part 2

document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .forEach((line) => {
    const parts = line.split(" ");

    const [low, high] = parts[0].split("-").map((x) => Number(x));
    const letter = parts[1][0];
    const password = parts[2];

    if ((password[low - 1] === letter ? 1 : 0) + (password[high - 1] === letter ? 1 : 0) === 1) {
      console.log("valid");
    }
  });
