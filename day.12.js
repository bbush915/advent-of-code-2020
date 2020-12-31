const fs = require("fs");
const { manhattanDistance } = require("./utils");

function parseInput() {
  return fs
    .readFileSync("./day.12.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => ({ action: x[0], value: Number(x.slice(1)) }));
}

const directionMap = {
  0: "E",
  90: "N",
  180: "W",
  270: "S",
};

function applyAction(context, action, value) {
  switch (action) {
    case "N": {
      context.y += value;
      break;
    }

    case "S": {
      context.y -= value;
      break;
    }

    case "E": {
      context.x += value;
      break;
    }

    case "W": {
      context.x -= value;
      break;
    }

    case "R": {
      context.facing -= value % 360;
      if (context.facing < 0) context.facing += 360;

      break;
    }

    case "L": {
      context.facing += value;
      if (context.facing >= 360) context.facing -= 360;

      break;
    }

    case "F": {
      applyAction(context, directionMap[context.facing], value);
      break;
    }
  }
}

function part1() {
  const instructions = parseInput();
  const context = { x: 0, y: 0, facing: 0 };

  for (const { action, value } of instructions) {
    applyAction(context, action, value);
  }

  return manhattanDistance(context.x, context.y);
}

function applyWaypointAction(context, action, value) {
  switch (action) {
    case "N": {
      context.dy += value;
      break;
    }

    case "S": {
      context.dy -= value;
      break;
    }

    case "E": {
      context.dx += value;
      break;
    }

    case "W": {
      context.dx -= value;
      break;
    }

    case "R": {
      switch (value) {
        case 90: {
          const temp = context.dx;
          context.dx = context.dy;
          context.dy = -temp;
          break;
        }

        case 180: {
          context.dx *= -1;
          context.dy *= -1;
          break;
        }

        case 270: {
          const temp = context.dx;
          context.dx = -context.dy;
          context.dy = temp;
          break;
        }
      }

      break;
    }

    case "L": {
      switch (value) {
        case 90: {
          const temp = context.dx;
          context.dx = -context.dy;
          context.dy = temp;
          break;
        }

        case 180: {
          context.dx *= -1;
          context.dy *= -1;
          break;
        }

        case 270: {
          const temp = context.dx;
          context.dx = context.dy;
          context.dy = -temp;
          break;
        }
      }

      break;
    }

    case "F": {
      context.x += context.dx * value;
      context.y += context.dy * value;

      break;
    }
  }
}

function part2() {
  const instructions = parseInput();
  const context = { x: 0, y: 0, dx: 10, dy: 1 };

  for (const { action, value } of instructions) {
    applyWaypointAction(context, action, value);
  }

  return manhattanDistance(context.x, context.y);
}

exports.part1 = part1;
exports.part2 = part2;
