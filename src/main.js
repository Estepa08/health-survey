import { loadQuestions } from './questions.js';
import { displayQuestion, updateQuestionCounter } from './display.js';
import { calculateScore } from './calculations.js';

// Простая навигация
let currentQuestionIndex = 0;
let questions = [];
let userAnswers = [];

// Функция для загрузки конфига результатов
async function loadResultsConfig() {
  try {
    const response = await fetch('./results-config.json');
    if (!response.ok) throw new Error('Failed to load results config');
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки конфига результатов:', error);
    return null;
  }
}

// Функция для показа детализированных результатов
function showDetailedResults(score, level) {
  const recommendationsHTML = level.recommendations 
    ? level.recommendations.map(rec => `<li>${rec}</li>`).join('')
    : '';

  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'results-container';
  resultsContainer.innerHTML = `
    <div class="results-card">
      <div class="results-header">
        <span class="emoji">${level.emoji}</span>
        <h2>${level.title}</h2>
      </div>
      
      <div class="score">${score} баллов</div>
      
      <div class="description">${level.description}</div>
      
      ${recommendationsHTML ? `
        <div class="recommendations">
          <h3>Рекомендации:</h3>
          <ul>${recommendationsHTML}</ul>
        </div>
      ` : ''}
      
      ${level.warning ? `<div class="warning">${level.warning}</div>` : ''}
      ${level.note ? `<div class="note">${level.note}</div>` : ''}
      
      ${level.emergency ? `
        <div class="emergency">
          <h3>Срочная помощь:</h3>
          <p>${level.emergency.service}: <strong>${level.emergency.phone}</strong></p>
          <p>${level.emergency.message}</p>
        </div>
      ` : ''}
      
      <button id="restart-btn" class="btn btn-primary">Пройти заново</button>
    </div>
  `;

  addResultsToPage(resultsContainer);
}

// Функция для простых результатов (fallback)
function showSimpleResults(score) {
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'results-container';
  resultsContainer.innerHTML = `
    <div class="results-card">
      <h2>Опрос завершен!</h2>
      <div class="score">${score} баллов</div>
      <button id="restart-btn" class="btn btn-primary">Пройти заново</button>
    </div>
  `;

  addResultsToPage(resultsContainer);
}

// Общая функция для добавления результатов на страницу
function addResultsToPage(resultsContainer) {
  // Прячем вопросы
  const questionContainer = document.querySelector('.question-card');
  const navigation = document.querySelector('.navigation');

  if (questionContainer) questionContainer.style.display = 'none';
  if (navigation) navigation.style.display = 'none';

  // Добавляем результаты
  const main = document.querySelector('main');
  if (main) {
    main.appendChild(resultsContainer);
  }

  // Кнопка "Пройти заново"
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => window.location.reload());
  }
}

// Основная функция показа результатов
async function showFinalResults() {
  const totalScore = calculateScore(userAnswers);
  const config = await loadResultsConfig();

  console.log('🎯 Финальный результат:', totalScore, 'баллов');

  // Если конфиг не загрузился - показываем простой результат
  if (!config) {
    showSimpleResults(totalScore);
    return;
  }

  // Находим подходящий уровень
  const level = config.levels.find(level => 
    totalScore >= level.minScore && totalScore <= level.maxScore
  );

  if (level) {
    showDetailedResults(totalScore, level);
  } else {
    showSimpleResults(totalScore);
  }
}

function handleAnswerSelection(questionIndex, answerValue) {
  userAnswers[questionIndex] = answerValue;
  updateNavigationButtons();
  console.log('Ответ сохранен:', userAnswers);
}

function updateNavigationButtons() {
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  if (nextBtn) {
    const hasAnswer = userAnswers[currentQuestionIndex] !== undefined;
    nextBtn.disabled = !hasAnswer;

    // Меняем текст на последнем вопросе
    if (currentQuestionIndex === questions.length - 1) {
      nextBtn.textContent = 'Завершить';
    } else {
      nextBtn.textContent = 'Далее';
    }
  }

  if (prevBtn) {
    prevBtn.disabled = currentQuestionIndex === 0;
  }
}

function goToNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(
      questions[currentQuestionIndex],
      currentQuestionIndex,
      handleAnswerSelection
    );
    updateQuestionCounter(currentQuestionIndex + 1, questions.length);
    updateNavigationButtons();
  } else {
    // Последний вопрос - показываем результаты
    showFinalResults();
  }
}

function goToPrevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(
      questions[currentQuestionIndex],
      currentQuestionIndex,
      handleAnswerSelection
    );
    updateQuestionCounter(currentQuestionIndex + 1, questions.length);
    updateNavigationButtons();
  }
}

function initNavigation() {
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', goToNextQuestion);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', goToPrevQuestion);
  }
}

// Основная функция
export async function initQuestionnaire() {
  console.log('🚀 Инициализация опросника...');

  questions = await loadQuestions();

  if (questions.length === 0) {
    console.error('Не удалось загрузить вопросы');
    return;
  }

  console.log(`✅ Загружено ${questions.length} вопросов`);

  initNavigation();
  updateQuestionCounter(1, questions.length);

  if (questions.length > 0) {
    displayQuestion(questions[0], 0, handleAnswerSelection);
    updateNavigationButtons();
  }
}