import { loadQuestions } from './questions.js';
import { displayQuestion, updateQuestionCounter } from './display.js';
import { calculateScore } from './calculations.js';

// Простая навигация
let currentQuestionIndex = 0;
let questions = [];
let userAnswers = [];

function showFinalResults() {
  const totalScore = calculateScore(userAnswers);

  console.log('🎯 Финальный результат:', totalScore, 'баллов');

  // Прячем вопросы
  const questionContainer = document.querySelector('.question-card');
  const navigation = document.querySelector('.navigation');

  if (questionContainer) questionContainer.style.display = 'none';
  if (navigation) navigation.style.display = 'none';

  // Показываем результаты
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'results-container';
  resultsContainer.innerHTML = `
    <div class="results-card">
      <h2>Опрос завершен!</h2>
      <div class="score">${totalScore} баллов</div>
      <button id="restart-btn" class="btn btn-primary">Пройти заново</button>
    </div>
  `;

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
