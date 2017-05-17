const test = require('ava');
const split = require('../index');

test('it must return an object', (t) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  const result = split(arr, (i) => {
    if (i >= 5) return '5+';
    if (i === 1) return '1';
    return 'other';
  });

  t.is(typeof result, 'object');
});

test('it must return expected keys count', (t) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  const result = split(arr, (i) => {
    if (i >= 5) return '5+';
    if (i === 1) return '1';
    return 'other';
  });

  t.is(Object.keys(result).length, 3);
});

test('it must drop null values', (t) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  const result = split(arr, (i) => {
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
  
});

test('it must stringify numbers', (t) => {
  
});

test('it must not include keys with no value', (t) => {
  
});
