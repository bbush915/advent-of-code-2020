function time(func) {
  const start = new Date().getTime();

  const result = func();

  return { elapsed: new Date().getTime() - start, result };
}

exports.time = time;
