import { calculateScore } from '../src/calculations.js';

describe('calculateScore', () => {
  test('возвращает 0 для пустого массива', () => {
    expect(calculateScore([])).toBe(0);
  });

  test('правильно суммирует разные значения', () => {
    expect(calculateScore([0, 1, 2, 3, 4])).toBe(10);
  });

  test('игнорирует undefined значения', () => {
    expect(calculateScore([1, undefined, 3])).toBe(4);
  });
});
