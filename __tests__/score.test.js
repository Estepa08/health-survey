import { calculateScore, showResult } from '../src/calculations.js';

describe('calculateScore', () => {
  test('возвращает 0 для пустого массива', () => {
    expect(calculateScore([])).toBe(0);
  });

  test('правильно суммирует разные значения', () => {
    expect(calculateScore([0, 1, 2, 3, 4])).toBe(10);
  });
});

describe('showResult', () => {
  // Мокаем console.log для чистого вывода тестов
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('выводит результат для нормального уровня', () => {
    const result = showResult(10, 20);
    expect(result.message).toContain('нормы');
  });

  test('выводит результат для выраженного уровня', () => {
    const result = showResult(70, 20);
    expect(result.message).toContain('выраженные');
  });
});