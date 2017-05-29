# array-split

## What does it do?

Splits an array into multiple arrays using a predicate function.
returns an object containing the results keyed based on the return value of the predicate function.

## How do I use it?

Example: Separate odd and even numbers

```js
const split = require('array-split');

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = split(numbers, (num) => {
  if (num % 2 === 0) return 'even';
  return 'odd';
});
```

This will return...

```json
{
  even: [2, 4, 6, 8],
  odd: [1, 3, 5, 7, 9]
}
```

## Anything else?

The predicate function only supports returning types...
`null`, `undefined`, `string` or `number`

- If you return `null` or `undefined` the value is dropped from the result set.
- If you return a `string` or a `number`, it is keyed in the results object (numbers are converted to strings)
