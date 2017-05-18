const split = (array, fn) => {
  return array.reduce((result, value) => {
    const key = fn(value);
    // discard values which resolve to a null or undefined key
    if (key == null) return result;
    if (typeof key !== 'number' && typeof key !== 'string' && typeof key !== 'boolean')
      throw new Error('predicate must only return strings or numbers');

    if (result[key] == null) result[key] = [value];
    else result[key].push(value);

    return result;
  }, {})
}

module.exports = split;
