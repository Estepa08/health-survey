import { calculateScore, calculatePercentage, determineConditionLevel } from '../script.js';

describe('calculateScore', () => {
  test('возвращает 0 для пустого массива', () => {
    expect(calculateScore([])).toBe(0);
  });

  test('возвращает 0 когда все ответы = 0', () => {
    expect(calculateScore([0, 0, 0, 0, 0])).toBe(0);
  });

  test('правильно суммирует разные значения', () => {
    expect(calculateScore([0, 1, 2, 3, 4])).toBe(10);
  });

  test('игнорирует null и undefined значения', () => {
    expect(calculateScore([0, null, 2, undefined, 4])).toBe(6);
  });

  test('работает с одним ответом', () => {
    expect(calculateScore([3])).toBe(3);
  });
});

describe('calculatePercentage', () => {
  test('правильно вычисляет проценты', () => {
    expect(calculatePercentage(25, 100)).toBe(25);
    expect(calculatePercentage(0, 100)).toBe(0);
    expect(calculatePercentage(75, 100)).toBe(75);
  });

  test('возвращает 0 при делении на 0', () => {
    expect(calculatePercentage(50, 0)).toBe(0);
  });
});

describe('determineConditionLevel', () => {
  test('определяет нормальный уровень (<25%)', () => {
    const result = determineConditionLevel(10, 20);
    expect(result.level).toBe('normal');
    expect(result.message).toContain('нормы');
  });

  test('определяет легкий уровень (25-50%)', () => {
    const result = determineConditionLevel(30, 20);
    expect(result.level).toBe('mild');
    expect(result.message).toContain('Легкое');
  });

  test('определяет умеренный уровень (50-75%)', () => {
    const result = determineConditionLevel(50, 20);
    expect(result.level).toBe('moderate');
    expect(result.message).toContain('Выраженные');
  });

  test('определяет выраженный уровень (75%+)', () => {
    const result = determineConditionLevel(70, 20);
    expect(result.level).toBe('severe');
    expect(result.message).toContain('Сильно');
  });
});