const program = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x);

// Part 1

(function () {
  const memory = {};
  let currentMask;

  program.forEach((x) => {
    const parts = x.split(" = ");

    if (parts[0] === "mask") {
      currentMask = parts[1];
    } else {
      const address = Number(parts[0].slice(4, parts[0].length - 1));
      const maskedValue = getMaskedValue(Number(parts[1]).toString(2).padStart(36, "0"), currentMask);

      memory[address] = maskedValue;
    }
  });

  function getMaskedValue(value, mask) {
    let result = String(value).split("");

    for (let i = 0; i < 36; i++) {
      if (mask[i] !== "X") {
        result.splice(i, 1, mask[i]);
      }
    }

    return parseInt(result.join(""), 2);
  }

  console.log(Object.values(memory).reduce((acc, cur) => ((acc += cur), acc)));
})();

// Part 2

(function () {
  const memory = {};
  let currentMask;

  program.forEach((x) => {
    const parts = x.split(" = ");

    if (parts[0] === "mask") {
      currentMask = parts[1];
    } else {
      const address = Number(parts[0].slice(4, parts[0].length - 1))
        .toString(2)
        .padStart(36, "0");
      const maskedAddresses = getMaskedAddresses(address, currentMask);

      maskedAddresses.forEach((x) => (memory[x] = Number(parts[1])));
    }
  });

  function getMaskedAddresses(address, mask) {
    let result = String(address).split("");

    for (let i = 0; i < 36; i++) {
      if (mask[i] !== "0") {
        result.splice(i, 1, mask[i]);
      }
    }

    let addresses = [""];

    for (let i = 0; i < 36; i++) {
      if (result[i] === "0" || result[i] === "1") {
        addresses = addresses.map((x) => x.concat(result[i]));
      } else {
        addresses = [...addresses.map((x) => x.concat("0")), ...addresses.map((x) => x.concat("1"))];
      }
    }

    return addresses.map((x) => parseInt(x, 2));
  }

  console.log(Object.values(memory).reduce((acc, cur) => ((acc += cur), acc)));
})();
