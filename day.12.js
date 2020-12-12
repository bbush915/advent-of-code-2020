const instructions = document
  .querySelector("pre")
  .innerText.split("\n")
  .filter((x) => x)
  .map((x) => ({ action: x[0], value: Number(x.slice(1)) }));

// Part 1

(function () {
  let x = 0;
  let y = 0;
  let facing = 0;

  const directionMap = {
    0: "E",
    90: "N",
    180: "W",
    270: "S",
  };

  function applyAction(action, value) {
    switch (action) {
      case "N": {
        y += value;
        break;
      }

      case "S": {
        y -= value;
        break;
      }

      case "E": {
        x += value;
        break;
      }

      case "W": {
        x -= value;
        break;
      }

      case "R": {
        facing -= value % 360;
        if (facing < 0) facing += 360;

        break;
      }

      case "L": {
        facing += value;
        if (facing >= 360) facing -= 360;

        break;
      }

      case "F": {
        applyAction(directionMap[facing], value);
        break;
      }
    }
  }

  for (let i = 0; i < instructions.length; i++) {
    const { action, value } = instructions[i];
    applyAction(action, value);
  }

  console.log(Math.abs(x) + Math.abs(y));
})();

// Part 2

(function () {
  let x = 0;
  let y = 0;
  let dx = 10;
  let dy = 1;

  function applyWaypointAction(action, value) {
    switch (action) {
      case "N": {
        dy += value;
        break;
      }

      case "S": {
        dy -= value;
        break;
      }

      case "E": {
        dx += value;
        break;
      }

      case "W": {
        dx -= value;
        break;
      }

      case "R": {
        switch (value) {
          case 90: {
            const temp = dx;
            dx = dy;
            dy = -temp;
            break;
          }

          case 180: {
            dx *= -1;
            dy *= -1;
            break;
          }

          case 270: {
            const temp = dx;
            dx = -dy;
            dy = temp;
            break;
          }
        }

        break;
      }

      case "L": {
        switch (value) {
          case 90: {
            const temp = dx;
            dx = -dy;
            dy = temp;
            break;
          }

          case 180: {
            dx *= -1;
            dy *= -1;
            break;
          }

          case 270: {
            const temp = dx;
            dx = dy;
            dy = -temp;
            break;
          }
        }

        break;
      }

      case "F": {
        x += dx * value;
        y += dy * value;

        break;
      }
    }
  }

  for (let i = 0; i < instructions.length; i++) {
    const { action, value } = instructions[i];
    applyWaypointAction(action, value);
  }

  console.log(Math.abs(x) + Math.abs(y));
})();
