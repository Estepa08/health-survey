import { loadQuestions } from './questions.js';
import { displayQuestion, updateQuestionCounter } from './display.js';

// Основная функция инициализации опросника
export async function initQuestionnaire() {
  console.log('🚀 Инициализация опросника...');
  
  const questions = await loadQuestions();
  
  if (questions.length === 0) {
    console.error('Не удалось загрузить вопросы');
    return;
  }

  console.log(`✅ Загружено ${questions.length} вопросов`);
  
  // Обновляем счетчик вопросов
  updateQuestionCounter(1, questions.length);
  
  // Отображаем первый вопрос
  if (questions.length > 0) {
    displayQuestion(questions[0]);
  }
}