function input() {
  return document
    .querySelector("pre")
    .innerText.split("\n")
    .filter((x) => x);
}

// Part 1

(function () {
  function evaluate(expression, context) {
    while (context.index < expression.length) {
      switch (expression[context.index]) {
        case " ": {
          context.index++;
          break;
        }

        case "(": {
          const newContext = evaluate(expression, createContext(context.index + 1));
          handleOperation(context, newContext);
          break;
        }

        case ")": {
          return context;
        }

        case "+": {
          context.index++;
          context.operation = "+";
          break;
        }

        case "*": {
          context.index++;
          context.operation = "*";
          break;
        }

        default: {
          const newContext = createContext(context.index, Number(expression[context.index]));
          handleOperation(context, newContext);
          break;
        }
      }
    }

    return context;
  }

  function createContext(index, value = null) {
    return { index, value, operation: null };
  }

  function handleOperation(context, newContext) {
    context.index = newContext.index + 1;

    switch (context.operation) {
      case null: {
        context.value = newContext.value;
        break;
      }

      case "+": {
        context.value = (context.value || 0) + newContext.value;
        context.operation = null;
        break;
      }

      case "*": {
        context.value = (context.value || 1) * newContext.value;
        context.operation = null;
        break;
      }
    }
  }

  const result = input()
    .map((x) => evaluate(x, createContext(0)).value)
    .reduce((acc, cur) => ((acc += cur), acc), 0);

  console.log(`Part 1: ${result}`);
})();

// Part 2

(function () {
  function tokenize(expression) {
    const children = [];

    let previousIndex = 0;
    let parenthesisDepth = 0;

    for (let currentIndex = 0; currentIndex < expression.length; currentIndex++) {
      switch (expression[currentIndex]) {
        case "(": {
          if (!parenthesisDepth) {
            previousIndex = currentIndex;
          }

          parenthesisDepth++;

          break;
        }

        case ")": {
          parenthesisDepth--;

          if (!parenthesisDepth) {
            const child = tokenize(expression.substring(previousIndex + 1, currentIndex));
            children.push(child);
          }

          break;
        }

        case "+":
        case "*": {
          if (!parenthesisDepth) {
            const child = expression[currentIndex];
            children.push(child);
          }

          break;
        }

        default: {
          if (parenthesisDepth || expression[currentIndex] === " ") {
            break;
          }

          const child = Number(expression[currentIndex]);
          children.push(child);

          break;
        }
      }
    }

    return children;
  }

  function evaluate(tokens) {
    if (tokens.length === 1) {
      return tokens[0];
    }

    for (let i = 0; i < tokens.length; i += 2) {
      tokens[i] = Array.isArray(tokens[i]) ? evaluate(tokens[i]) : tokens[i];
    }

    let index;

    // NOTE - Addition pass.

    index = 1;

    while (index < tokens.length) {
      if (tokens[index] === "+") {
        tokens.splice(index - 1, 3, tokens[index - 1] + tokens[index + 1]);
      } else {
        index += 2;
      }
    }

    // NOTE - Multiplication pass.

    index = 1;

    while (index < tokens.length) {
      if (tokens[index] === "*") {
        tokens.splice(index - 1, 3, tokens[index - 1] * tokens[index + 1]);
      } else {
        index += 2;
      }
    }

    return tokens[0];
  }

  const result = input()
    .map((x) => evaluate(tokenize(x)))
    .reduce((acc, cur) => ((acc += cur), acc), 0);

  console.log(`Part 2: ${result}`);
})();
