const test = require('ava');
const split = require('../index');

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const predicate = (num) => {
  if (num >= 5) return '5+';
  if (num === 1) return '1';
  return 'other';
}

test('it must not mutate the original array', (t) => {
  const original = numbers.slice(0);

  const result = split(numbers, predicate);

  t.deepEqual(numbers, original);
});

test('it must return an object', (t) => {
  const result = split(numbers, predicate);

  t.is(typeof result, 'object');
});

test('it must return expected keys count', (t) => {
  const result = split(numbers, predicate);

  t.is(Object.keys(result).length, 3);
});

test('it must return expected result', (t) => {
  const result = split(numbers, predicate);

  const expected = {
    '1': [1],
    '5+': [5, 6, 7, 8],
    'other': [2, 3, 4]
  };

  t.deepEqual(result, expected);
});

test('it must drop null values', (t) => {
  const result = split(numbers, (i) => {
    if (i >= 5) return '5+';
    if (i === 1) return '1';
    return null;
  });

  const expected = {
    '1': [1],
    '5+': [5, 6, 7, 8]
  };

  t.deepEqual(result, expected);
});


test('it must drop undefined values', (t) => {
  const result = split(numbers, (i) => {
    if (i >= 5) return '5+';
    if (i === 1) return '1';
    return undefined;
  });

  const expected = {
    '1': [1],
    '5+': [5, 6, 7, 8]
  };

  t.deepEqual(result, expected);
});

test('it must stringify numbers', (t) => {
  const result = split(numbers, (i) => {
    if (i >= 5) return 5;
    if (i === 1) return 1;
    return 'other';
  });

  const expected = {
    '1': [1],
    '5': [5, 6, 7, 8],
    'other': [2, 3, 4]
  };

  t.deepEqual(result, expected);
});

test('it must stringify booleans', (t) => {
  const result = split(numbers, (i) => {
    return (i > 4);
  });

  const expected = {
    'false': [1, 2, 3, 4],
    'true': [5, 6, 7, 8]
  };

  t.deepEqual(result, expected);
});

test('it must throw when a predicate returns an object', (t) => {
  const error = t.throws(
    () => split(numbers, (num) => { return {}; }),
  );

  t.is(error.message, 'predicate must only return strings or numbers');
});

test('it must not include keys with no value', (t) => {
  const result = split([1, 5, 6, 7, 8], (i) => {
    if (i >= 5) return '5+';
    if (i === 1) return '1';
    return 'other';
  });
  
  t.is(Object.keys(result).length, 2);
  t.deepEqual(Object.keys(result), ['1', '5+']);
});
