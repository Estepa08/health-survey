// Чистая функция для подсчета баллов опросника
function calculateScore(answers) {
  if (!answers || answers.length === 0) return 0;

  return answers.reduce((sum, answer) => {
    return sum + (answer || 0);
  }, 0);
}

// Функция для вывода результата
function showResult(score, totalQuestions) {
  const maxScore = (totalQuestions - 1) * 4;
  const percentage = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);

  let message;
  if (percentage < 25) {
    message = 'Состояние в пределах нормы';
  } else if (percentage < 50) {
    message = 'Легкое снижение настроения';
  } else if (percentage < 75) {
    message = 'Выраженные признаки снижения настроения';
  } else {
    message = 'Сильно выраженные признаки';
  }

  console.log(`Результат: ${score} баллов (${percentage}%) - ${message}`);
  return { score, percentage, message };
}

// Функция для загрузки вопросов
async function loadQuestions() {
  try {
    const response = await fetch('./questions.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки вопросов:', error);
    return [];
  }
}

// Функция для отображения вопроса на странице
function displayQuestion(question) {
  // Находим элементы на странице
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const currentQuestionSpan = document.getElementById('current-question');
  const totalQuestionsSpan = document.getElementById('total-questions');

  if (!questionText || !optionsContainer) {
    console.error('Не найдены элементы для отображения вопроса');
    return;
  }

  // Обновляем текст вопроса
  questionText.textContent = question.question;

  // Очищаем предыдущие варианты ответов
  optionsContainer.innerHTML = '';

  // Создаем варианты ответов
  question.options.forEach((optionText, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = optionText;
    optionElement.dataset.value = index; // Сохраняем числовое значение (0-4)

    // Добавляем обработчик клика
    optionElement.addEventListener('click', () => {
      // Убираем выделение у всех вариантов
      document.querySelectorAll('.option').forEach((opt) => {
        opt.classList.remove('selected');
      });
      // Выделяем выбранный вариант
      optionElement.classList.add('selected');

      console.log(`Выбран ответ: ${optionText} (балл: ${index})`);
    });

    optionsContainer.appendChild(optionElement);
  });

  console.log(`Отображен вопрос: "${question.question}"`);
}

// Основная функция инициализации опросника
async function initQuestionnaire() {
  console.log('🚀 Инициализация опросника...');

  const questions = await loadQuestions();

  if (questions.length === 0) {
    console.error('Не удалось загрузить вопросы');
    return;
  }

  console.log(`✅ Загружено ${questions.length} вопросов`);

  // Обновляем счетчик вопросов
  const totalQuestionsSpan = document.getElementById('total-questions');
  if (totalQuestionsSpan) {
    totalQuestionsSpan.textContent = questions.length;
  }

  // Отображаем первый вопрос
  if (questions.length > 0) {
    displayQuestion(questions[0]);
  }
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', initQuestionnaire);
