import { calculateScore } from '../src/calculations.js';

test('calculateScore работает корректно', () => {
  expect(calculateScore([1, 2, 3])).toBe(6);
  expect(calculateScore([])).toBe(0);
  expect(calculateScore([0, 0, 0])).toBe(0);
});
