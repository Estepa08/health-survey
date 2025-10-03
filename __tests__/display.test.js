import { displayQuestion, updateQuestionCounter } from '../src/display.js';

// Мокаем DOM
beforeEach(() => {
  document.body.innerHTML = `
    <div id="question-text"></div>
    <div id="options-container"></div>
    <span id="current-question">1</span>
    <span id="total-questions">5</span>
  `;
});

describe('displayQuestion', () => {
  test('отображает вопрос и варианты ответов', () => {
    const question = {
      question: 'Тестовый вопрос',
      options: ['Вариант 1', 'Вариант 2'],
    };

    displayQuestion(question);

    expect(document.getElementById('question-text').textContent).toBe(
      'Тестовый вопрос'
    );
    expect(document.querySelectorAll('.option').length).toBe(2);
  });
});

describe('updateQuestionCounter', () => {
  test('обновляет счетчик вопросов', () => {
    updateQuestionCounter(2, 10);

    expect(document.getElementById('current-question').textContent).toBe('2');
    expect(document.getElementById('total-questions').textContent).toBe('10');
  });
});
