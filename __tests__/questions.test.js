import { loadQuestions } from '../src/questions.js';

// Мокаем fetch
global.fetch = jest.fn();

describe('loadQuestions', () => {
  beforeEach(() => {
    fetch.mockClear();
    // Мокаем console.error чтобы не засорять вывод тестов
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Восстанавливаем оригинальный console.error
    console.error.mockRestore();
  });

  test('успешно загружает вопросы', async () => {
    const mockQuestions = [{ id: 1, question: 'Test', options: [] }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuestions
    });

    const questions = await loadQuestions();
    expect(questions).toEqual(mockQuestions);
  });

  test('возвращает пустой массив при ошибке', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const questions = await loadQuestions();
    expect(questions).toEqual([]);
    // Проверяем что console.error был вызван
    expect(console.error).toHaveBeenCalledWith(
      'Ошибка загрузки вопросов:',
      expect.any(Error)
    );
  });
});