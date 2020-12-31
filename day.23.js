function build(array) {
  const map = {};

  for (let i = 0; i < array.length; i++) {
    const node = {
      val: array[i],
      next: i === array.length - 1 ? array[0] : array[i + 1],
      prev: i === 0 ? array[array.length - 1] : array[i - 1],
    };

    map[node.val] = node;
  }

  return map;
}

function remove(map, val, count) {
  const nodes = [];

  let node = map[map[val].next];

  for (let i = 0; i < count; i++) {
    nodes.push(node);
    delete map[node.val];

    node = map[node.next];
  }

  map[nodes[0].prev].next = nodes[nodes.length - 1].next;
  map[nodes[nodes.length - 1].next].prev = nodes[0].prev;

  return nodes;
}

function insert(map, val, nodes) {
  for (let i = 0; i < nodes.length; i++) {
    map[nodes[i].val] = nodes[i];
  }

  map[map[val].next].prev = nodes[nodes.length - 1].val;
  nodes[nodes.length - 1].next = map[map[val].next].val;

  map[val].next = nodes[0].val;
  nodes[0].prev = map[val].val;
}

function run(map, cur, min, max, num) {
  for (let i = 0; i < num; i++) {
    const rem = remove(map, cur, 3);

    let dest = cur;

    do {
      dest--;
      if (dest < min) dest = max;
    } while (!map[dest]);

    insert(map, dest, rem);

    cur = map[cur].next;
  }
}

function part1() {
  const cups = [7, 1, 2, 6, 4, 3, 5, 8, 9];

  const map = build(cups);
  const cur = cups[0];
  const min = 1;
  const max = 9;

  run(map, cur, min, max, 100);

  const numbers = [map[1].next];

  while (true) {
    const node = map[numbers[numbers.length - 1]];

    if (node.next === 1) {
      break;
    }

    numbers.push(node.next);
  }

  return numbers.join("");
}

function part2() {
  const cups = [7, 1, 2, 6, 4, 3, 5, 8, 9];

  for (let i = 10; i <= 1000000; i++) {
    cups.push(i);
  }

  const map = build(cups);
  const cur = cups[0];
  const min = 1;
  const max = 1000000;

  run(map, cur, min, max, 10000000);

  return map[1].next * map[map[1].next].next;
}

exports.part1 = part1;
exports.part2 = part2;
